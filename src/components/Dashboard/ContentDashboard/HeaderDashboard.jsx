import React, { useContext } from "react";
import { useHistory } from "react-router";

// Import Contexts
import { UserContext } from "../../../App";
import { DashboardContext } from "../../../views/Dashboard";
import roles from "../../../utils/roles";

import { AiFillPlusCircle } from "react-icons/ai";

// Import components
import Counter from "../../Counter";

/**
 * HeaderDashboard component
 * @returns 
 */
export default function HeaderDashboard() {
  const history = useHistory();
  const { userCredentials } = useContext(UserContext);
  const { contributions, setShowNewRef } = useContext(DashboardContext);

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

      <article className="is-flex is-justify-content-space-between px-6 pb-6">
        <div className="is-flex is-flex-direction-column is-align-items-center">
          <Counter
            label="contributions validées"
            value={contributions.validated.length}
          />
          <p className="has-text-weight-bold">VALIDÉES</p>
        </div>

        <div className="is-flex is-flex-direction-column is-align-items-center">
          <Counter
            label="contributions en attente"
            value={contributions.pending.length}
          />
          <p className="has-text-weight-bold">EN ATTENTE</p>
        </div>

        {/*userCredentials.role === roles.ADMIN && (*/
          <>
            <div className="is-flex is-flex-direction-column is-align-items-center">
              <Counter
                label="contributeurs"
                value={0}
              />
              <p className="has-text-weight-bold">CONTRIBUTEURS</p>
            </div>
            <div className="is-flex is-flex-direction-column is-align-items-center">
              <Counter
                label="admins"
                value={0}
              />
              <p className="has-text-weight-bold">ADMINS</p>
            </div>
          </>
        /*)*/}

        <div className="box counter-box is-flex is-justify-content-center">
          
          <AiFillPlusCircle
            size={32}
            className="pointer"
            onClick={() => setShowNewRef(true)}
          />
        </div>
      </article>
    </header>
  );
}
