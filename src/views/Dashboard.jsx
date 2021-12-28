import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import http from "../services/http-common";

// JS
import handleResponse from "../utils/handleResponse";

// Components
import HeaderDashboard from '../components/Dashboard/ContentDashboard/HeaderDashboard'
import MainDashboard from "../components/Dashboard/ContentDashboard/MainDashboard";
import AddReference from "../components/Dashboard/FormDashboard/AddReference";

// Context
import { UserCredentials } from "../App";

import "../css/dashboard.css";
import "../css/counter.css";

// COMPONENT
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
  
  // TODO: do we really need a variable for that?
  const changeIsClicked = () => setShowNewRef(!showNewRef);

  // Gets the number of contributions (validated/pending) depending on the contributor
  // TO DO: if the list is displayed, we could use the counting algorithm mentioned in HOME view to feed these counters. It'd save API calls?
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

  // Gets the number of contributions (validated/pending) depending on the admin + number of contributors and number of admins
  // TODO: same remark than above: maybe we'd need to call API only for number of admins (we already have the number of contributors in HOME view, we just need to spread it to here)
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

  // If user is authentified, then counters are loaded depending on their role
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
