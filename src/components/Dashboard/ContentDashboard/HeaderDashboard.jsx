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
    <header className="flex is-flex-direction-column is-justify-content-space-around dashboard dashboard-content borders grey-bg-opacity-cat">
      <p>
        Bienvenue, {currentUser.name}&nbsp;
        <span
          className="pointer white-hover"
          onClick={() => history.push("/auth/signout")}
        >
          (Déconnexion)
        </span>
      </p>

      <article className="flex is-justify-content-space-between">
        <Counter
          label="contributions validées"
          value={contributions.validated}
          className="white-bg"
        />

        <Counter
          label="contributions en attente"
          value={contributions.pending}
        />

        {currentUser.role === 3 && (
          <div className="flex is-justify-content-space-around">
            <Counter
              label="contributeurs"
              value={users.totalContributors ? users.totalContributors : 0}
            />

            <Counter
              label="admins"
              value={users.nbOfAdmins ? users.nbOfAdmins : 0}
            />
          </div>
        )}

        <div className="box is-justify-content-center is-align-items-center">
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
