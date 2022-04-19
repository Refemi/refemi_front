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

      <section className="is-flex is-justify-content-space-between p-4">
        <article className="dashboard-counter is-flex is-flex-direction-column is-align-items-center pt-4 px-4">
          <Counter
            label="contributions validées"
            value={counters.totalApprovedContributions}
          />
          <p className="has-text-weight-bold">VALIDÉES</p>
        </article>

        <article className="dashboard-counter is-flex is-flex-direction-column is-align-items-center pt-4 px-4">
          <Counter
            label="contributions en attente"
            value={counters.totalPendingContributions}
          />
          <p className="has-text-weight-bold">EN ATTENTE</p>
        </article>

        {userCredentials.role === roles.ADMIN && (
          <article className="is-flex is-flex-direction-column is-align-items-center pt-4 px-4">
            <Counter label="contributeurs" value={counters.totalContributors} />
            <p className="has-text-weight-bold">CONTRIBUTEURS</p>
            <div className="is-flex is-flex-direction-column is-align-items-center">
              <Counter label="admins" value={counters.totalAdministrators} />
              <p className="has-text-weight-bold">ADMINS</p>
            </div>
          </article>
        )}

        <article className="dashboard-counter box counter-box is-flex is-justify-content-center mt-4">
          <AiFillPlusCircle
            size={32}
            className="pointer"
            onClick={() => setShowNewRef(true)}
          />
        </article>
      </section>
    </header>
  );
}
