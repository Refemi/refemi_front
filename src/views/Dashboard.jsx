import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import http from "../services/http-common";
import handleResponse from "../utils/handleResponse";

import "../css/dashboard.css";
import "../css/counter.css";

import HeaderDashboard from '../components/Dashboard/HeaderDashboard'
import AddReference from "../components/Dashboard/AddReference";

import { UserCredentials } from "../App";

export default function Dashboard() {
  const history = useHistory();
  const { userCredentials, token, isLoggedIn } = useContext(UserCredentials);
  const [showNewRef, setShowNewRef] = useState(false);
  const [allUsers, setAllUsers] = useState({
    nbOfContributors: 0,
    nbOfAdmins: 0,
  });
  const [contributions, setContributions] = useState({
    validated: 0,
    pending: 0,
  });

  const getContributorCount = (token) => {
    http
      .get("counter/dashboard/contributor", {
        headers: { "x-access-token": token },
      })
      .then((response) => ({
        validated: response.approvedContributions,
        pending: response.pendingContributions,
      }));
  };

  const getAdminCounter = (token) => {
    http.get("counter/dashboard/admin", { headers: { "x-access-token": token } })
      .then((response) => handleResponse(response, 200))
      .then((response) => {
        setContributions({
          validated: response.approvedContributions,
          pending: response.pendingContributions,
        });

        setAllUsers({
          nbOfContributors: response.totalContributors,
          nbOfAdmins: response.totalAdmins,
        });
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth/signin");
    } else {
      if (userCredentials.role > 1) {
        // TODO Récupérer les informations pour les users avec un rôle au dessus du simple contributeur
      } else {
        // TODO Récupérer les infiormations pour les simples users
      }
    }
  }, [isLoggedIn, token, userCredentials]);

  useEffect(() => {
    getContributorCount(token);
    getAdminCounter(token);
  }, [token]);

  useEffect(() => {
    window.scrollY > 0 && window.scrollTo(0, 0);
  }, []);

  const changeIsClicked = () => setShowNewRef(!showNewRef);

  return (
    isLoggedIn && (
      <div className="flex justify-center margin-top10">
        <div className="width80">
          <HeaderDashboard
            user={{ name: userCredentials.name, role: userCredentials.role }}
            contributions={contributions}
            users={allUsers}
            setShowNewRef={setShowNewRef}
          />

          {showNewRef ? (
            <AddReference changeIsClicked={changeIsClicked} />
          ) : (
            <div className="dashboard dashboard-content borders">
              <div className="margin-bottom">
                {userCredentials.role === "contributor" &&
                  userCredentials.validatedContributions.length > 0 && (
                    <div>
                      <p className="dashboard-title">
                        Contributions validées :
                      </p>
                      {userCredentials.validatedContributions.map(
                        (contribution, index) => (
                          <div key={index}>{contribution}</div>
                        )
                      )}
                      <hr className="margin7" />
                    </div>
                  )}
              </div>

              <div>
                {userCredentials.role === "contributor" &&
                  userCredentials.pendingContributions.length > 0 && (
                    <div>
                      <p className="dashboard-title">
                        Contributions en attente de validation :
                      </p>

                      {userCredentials.pendingContributions.map(
                        (contribution, index) => (
                          <div key={index}>{contribution}</div>
                        )
                      )}
                      <hr className="margin7" />
                    </div>
                  )}

                <div>
                  <p className="dashboard-title">Contributions validées :</p>
                  {/* Ici récupérer la liste de toutes les contributions des contributeurs en attente de validation */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
