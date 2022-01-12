import React, { useContext } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import { UserCredentials } from "../../../App";
import roles from "../../../utils/roles";

import { AiFillPlusCircle } from "react-icons/ai";

// Components
import Counter from "../../Counter";

// COMPONENT
export default function HeaderDashboard({ contributions, users, setShowNewRef, }) {
  const history = useHistory();
  const { userCredentials } = useContext(UserCredentials);

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
            value={contributions.totalValidated}
          />
          <p className="has-text-weight-bold">VALIDÉES</p>
        </div>

        <div className="is-flex is-flex-direction-column is-align-items-center">
          <Counter
            label="contributions en attente"
            value={contributions.totalPending}
          />
          <p className="has-text-weight-bold">EN ATTENTE</p>
        </div>

        {userCredentials.role === roles.ADMIN && (
          <>
            <div className="is-flex is-flex-direction-column is-align-items-center">
              <Counter
                label="contributeurs"
                value={users.totalContributors ? users.totalContributors : 0}
              />
              <p className="has-text-weight-bold">CONTRIBUTEURS</p>
            </div>
            <div className="is-flex is-flex-direction-column is-align-items-center">
              <Counter
                label="admins"
                value={users.totalAdmins ? users.totalAdmins : 0}
              />
              <p className="has-text-weight-bold">ADMINS</p>
            </div>
          </>
        )}

        <div className="box counter-box is-flex is-justify-content-center">
          
          <AiFillPlusCircle
            onClick={() => setShowNewRef(true)}
            size={32}
            className="pointer"
          />
        </div>
      </article>
    </header>
  );
}

HeaderDashboard.propTypes = {
  contributions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  setShowNewRef: PropTypes.func.isRequired
}
