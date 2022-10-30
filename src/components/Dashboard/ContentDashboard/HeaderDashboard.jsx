import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// Import Contexts
import { UserContext } from "../../../App";

// Import JS + JSON
import http from "../../../services/http-common";
import roles from "../../../utils/roles";
import translationKeys from "../../../utils/translationKeys.json";

//Import icons
import { AiFillPlusCircle } from "react-icons/ai";

// Import components
import Counter from "../../Counter";

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

export default function HeaderDashboard() {
  const frenchKeys = translationKeys[0].french;
  const history = useHistory();
  const { userCredentials, token } = useContext(UserContext);
  const [counters, setCounters] = useState({});

  useEffect(() => {
    (async () => {
      userCredentials.role === roles.ADMIN
        ? setCounters(await getAdminCounter(token))
        : setCounters(await getUserCounter(token));
    })();
  }, [userCredentials, token]);

  return (
    <header className="dashboard-header is-flex is-flex-direction-column is-justify-content-space-around p-2">
      <p className="is-size-7 pb-2">
        {frenchKeys.welcome}, {userCredentials.name}&nbsp;
        <span className="pointer" onClick={() => history.push("/auth/signout")}>
          ({frenchKeys.signOut})
        </span>
      </p>
      <h2 className="has-text-centered is-uppercase has-text-weight-bold">
        {frenchKeys.contributionDashboard}
      </h2>
      <hr />

      <section className="dashboard-counters is-flex is-justify-content-center is-flex-wrap-wrap">
        <div className="is-flex is-justify-content-space-between counter-double">
          <article className="is-flex is-flex-direction-column is-align-items-center px-4 counter-wrapper">
            <Counter
              label="contributions validées"
              value={counters.totalApprovedContributions}
            />
            <p className="has-text-weight-bold counter-label">
              {frenchKeys.validatedContributions}
            </p>
          </article>

          <article className="is-flex is-flex-direction-column is-align-items-center px-4 counter-wrapper">
            <Counter
              label="contributions en attente"
              value={counters.totalPendingContributions}
            />
            <p className="has-text-weight-bold counter-label">
              {frenchKeys.pendingContributions}
            </p>
          </article>
        </div>

        {userCredentials.role === roles.ADMIN && (
          <div className="is-flex is-justify-content-space-between counter-double">
            <article className="is-flex is-flex-direction-column is-align-items-center counter-wrapper">
              <Counter
                label="contributeurs"
                value={counters.totalContributors}
              />
              <p className="has-text-weight-bold counter-label">
                {frenchKeys.contributors}
              </p>
            </article>
            <article className="is-flex is-flex-direction-column is-align-items-center counter-wrapper px-4">
              <Counter label="admins" value={counters.totalAdministrators} />
              <p className="has-text-weight-bold counter-label">
                {frenchKeys.administrators}
              </p>
            </article>
          </div>
        )}
      </section>
      <article className="is-flex is-flex-direction-column is-align-items-center px-4 add-button_wrapper pb-4">
        <button className="add-button_btn">
          <AiFillPlusCircle
            size={32}
            className="pointer add-button_icon"
            onClick={() => history.push("/addReference")}
          />
        </button>
      </article>
    </header>
  );
}
