import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import { UserCredentials } from "../../../App";
import roles from "../../../utils/roles";

import { AiFillPlusCircle } from "react-icons/ai";

// Components
import Counter from "../../Counter";

// COMPONENT
export default function HeaderDashboard({ contributions, themes, users, setShowNew, }) {
  const history = useHistory();
  const { userCredentials } = useContext(UserCredentials);
  const [dropDown, setDropDown] = useState(undefined);

  useEffect(() => {
    const closeMenu = (e) => {
      e.preventDefault();
      setDropDown(false);
      document.removeEventListener("click", closeMenu);
    };
    !!dropDown && document.addEventListener("click", closeMenu);
  }, [dropDown]);


  return (
    <section className="dashboard-header borders p-5">
      <article className="columns">
        <p className="column is-5">
          Bienvenue, {userCredentials.name}&nbsp;
          <span className="pointer" onClick={() => history.push("/auth/signout")}>
            (Déconnexion)
          </span>
        </p>
        <h2 className="column is-uppercase has-text-weight-bold is-align-items-center">
          Tableau des contributions
        </h2>
      </article>
      <hr />
      <article className="columns p-5">
        <div className="column is-one-fifth is-flex is-flex-direction-column is-align-items-center">
          <Counter
            label="contributions validées"
            value={contributions.totalValidated}
          />
          <p className="has-text-weight-bold">VALIDÉES</p>
        </div>

        <div className="column is-one-quarter is-flex is-flex-direction-column is-align-items-center">
          <Counter
            label="contributions en attente"
            value={contributions.totalPending}
          />
          <p className="has-text-weight-bold">EN ATTENTE</p>
        </div>

        {userCredentials.role === roles.ADMIN && (
          <>
            <div className="column is-one-fifth is-flex is-flex-direction-column is-align-items-center">
              <Counter
                label="contributeurs"
                value={users.totalContributors ? users.totalContributors : 0}
              />
              <p className="has-text-weight-bold">CONTRIBUTEURS</p>
            </div>
            <div className="column is-one-fifth is-flex is-flex-direction-column is-align-items-center">
              <Counter
                label="admins"
                value={users.totalAdmins ? users.totalAdmins : 0}
              />
              <p className="has-text-weight-bold">ADMINS</p>
            </div>
          </>
        )}

        <div className="column is-one-fifth is-flex is-flex-direction-column is-align-items-center mt-5">
          <div className="box">
            <AiFillPlusCircle
              size={32}
              className="pointer"
              onClick={() => setDropDown(!dropDown)}
            />

            <div className={`dropdown ${!!dropDown && 'is-active'}`}>
              <div className="dropdown-menu dropdown-content-radius-10" id="dropdown-menu2" role="menu">
                <div className="dropdown-content p-0">
                  <div className="dropdown-item">
                    <span className="drowndown-btn pointer" onClick={() => setShowNew('reference')}>Suggérer une référence.</span>
                  </div>
                  <div className="dropdown-item">
                    <span className="drowndown-btn pointer" onClick={() => setShowNew('theme')}>Suggérer un thème.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

HeaderDashboard.propTypes = {
  contributions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  setShowNew: PropTypes.func.isRequired
}
