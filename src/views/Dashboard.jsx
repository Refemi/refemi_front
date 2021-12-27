import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import http from "../services/http-common";
import handleResponse from "../utils/handleResponse";

import "../css/dashboard.css";
import "../css/counter.css";

import HeaderDashboard from '../components/Dashboard/ContentDashboard/HeaderDashboard'
import MainDashboard from "../components/Dashboard/ContentDashboard/MainDashboard";
import AddReference from "../components/Dashboard/FormDashboard/AddReference";

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
          totalContributors: response.totalContributors,
          totalAdmins: response.totalAdmins,
        });
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth/signin");
    } else {
      if (userCredentials.role > 1) {
        getAdminCounter(token)
      } else {
        getContributorCount(token)
      }
    }
  }, [isLoggedIn, token, userCredentials, history]);

  useEffect(() => {
    window.scrollY > 0 && window.scrollTo(0, 0);
  }, []);

  const changeIsClicked = () => setShowNewRef(!showNewRef);

  return (
    isLoggedIn && (
      <div className="flex justify-center margin-top10">
        <div className="width80">
          <HeaderDashboard
            currentUser={{ name: userCredentials.name, role: userCredentials.role }}
            contributions={contributions}
            users={allUsers}
            setShowNewRef={setShowNewRef}
          />

          {showNewRef
            ? <AddReference changeIsClicked={changeIsClicked} />
            : <MainDashboard currentUser={userCredentials} contributions={contributions} />
          }
        </div>
      </div>
    )
  );
}
