import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// Import Contexts
import { UserContext } from "../../../App";
import { DashboardContext } from "../../../views/Dashboard";

// Import roles utils — REST-API utils
import http from "../../../services/http-common";
import roles from "../../../utils/roles";

//Import icons
import { AiFillPlusCircle } from "react-icons/ai";

// Import components
import Counter from "../../Counter";

/**
 * Retrieve counters for administrators
 * @param {string} token
 * @returns
 */
const getAdminCounter = async (token) =>
  await http(token)
    .get("/counters/dashboard/admin/")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ counters }) => counters);
/**
 * Retrieve counters for users
 * @param {string} token
 * @returns
 */
const getUserCounter = async (token) =>
  await http(token)
    .get("/counters/dashboard/contributor")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ counters }) => counters);

/**
 * HeaderDashboard component
 * @returns
 */
export default function HeaderDashboard() {
  const history = useHistory();
  const { userCredentials, token } = useContext(UserContext);
  const { setShowNewRef } = useContext(DashboardContext);
  const [counters, setCounters] = useState({});

  useEffect(() => {
    (async () => {
      userCredentials.role === roles.ADMIN
        ? setCounters(await getAdminCounter(token))
        : setCounters(await getUserCounter(token));
    })();
  }, [userCredentials, token]);

  return (
    <header className="dashboard-header is-flex is-flex-direction-column is-justify-content-space-around borders">
      <p className="pl-6 pt-6">
        Bienvenue, {userCredentials.name}&nbsp;
        <span className="pointer" onClick={() => history.push("/auth/signout")}>
          (Déconnexion)
        </span>
      </p>
      <h2 className="has-text-centered is-uppercase has-text-weight-bold">
        Tableau des contributions
      </h2>
      <hr />

      <section className="dashboard-counters is-flex is-justify-content-center is-flex-wrap-wrap">
        <div className="is-flex is-justify-content-space-between counter-double">
          <article className="is-flex is-flex-direction-column is-align-items-center px-4 counter-wrapper">
            <Counter
              label="contributions validées"
              value={counters.totalApprovedContributions}
            />
            <p className="has-text-weight-bold counter-label">VALIDÉES</p>
          </article>

          <article className="is-flex is-flex-direction-column is-align-items-center px-4 counter-wrapper">
            <Counter
              label="contributions en attente"
              value={counters.totalPendingContributions}
            />
            <p className="has-text-weight-bold counter-label">EN ATTENTE</p>
          </article>
        </div>

        {userCredentials.role === roles.ADMIN && (
          <div className="is-flex is-justify-content-space-between counter-double">
            <article className="is-flex is-flex-direction-column is-align-items-center px-4 counter-wrapper">
              <Counter
                label="contributeurs"
                value={counters.totalContributors}
              />
              <p className="has-text-weight-bold">CONTRIBUTEURS</p>
            </article>
            <article className="is-flex is-flex-direction-column is-align-items-center counter-wrapper">
              <Counter label="admins" value={counters.totalAdministrators} />
              <p className="has-text-weight-bold">ADMINS</p>
            </article>
          </div>
        )}
      </section>
      <article className="is-flex is-flex-direction-column is-align-items-center px-4 add-button_wrapper pb-4">
        <Counter
          label="addReference"
          onClick={() => setShowNewRef(true)}
          value={<AiFillPlusCircle size={32} className="pointer" />}
        />
      </article>
    </header>
  );
}
