import React from "react";
import { useHistory } from "react-router";
import { AiFillPlusCircle } from "react-icons/ai";

// Components
import Counter from "../../Counter";

// COMPONENT
export default function Header({
  currentUser,
  contributions,
  users,
  setShowNewRef,
}) {
  const history = useHistory();

  return (
    <header className="dashboard-header is-flex is-flex-direction-column is-justify-content-space-around borders">
      <p className="pl-6 pt-6">
        Bienvenue, {currentUser.name}&nbsp;
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
            value={contributions.validated}
          />
          <p className="has-text-weight-bold">VALIDÉES</p>
        </div>

        <div className="is-flex is-flex-direction-column is-align-items-center">
          <Counter
            label="contributions en attente"
            value={contributions.pending}
          />
          <p className="has-text-weight-bold">EN ATTENTE</p>
        </div>

        {currentUser.role === 3 && (
          <div className="box counter-box is-flex is-justify-content-space-around">
            <Counter
              label="contributeurs"
              value={users.totalContributors ? users.totalContributors : 0}
            />
            <p className="has-text-weight-bold">CONTRIBUTEURS</p>

            <Counter
              label="admins"
              value={users.nbOfAdmins ? users.nbOfAdmins : 0}
            />
            <p className="has-text-weight-bold">ADMINS</p>
          </div>
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
