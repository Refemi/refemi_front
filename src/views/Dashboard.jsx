import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// JS
import http from "../services/http-common";
import handleResponse from "../utils/handleResponse";
import roles from "../utils/roles";

// Components
import HeaderDashboard from '../components/Dashboard/ContentDashboard/HeaderDashboard'
import MainDashboard from "../components/Dashboard/ContentDashboard/MainDashboard";
import AddReference from "../components/Dashboard/FormDashboard/AddReference";

// Context
import { UserCredentials } from "../App";

import "../css/dashboard.css";
import "../css/counter.css";

// COMPONENT
const getContributorCounters = async (token) => {
  return await http.get("counter/dashboard/contributor", {
    headers: { "x-access-token": token },
  })
    .then(response => {
      if (response.status === 200) {
        return response.data
      }
    })
    .then(data => ({
      contributions: {
        validated: data.approvedContributions,
        pending: data.pendingContributions
      }
    }));
};
const getAdminCounters = async (token) => {
  http.get("counter/dashboard/admin", { headers: { "x-access-token": token } })
    .then((response) => handleResponse(response, 200))
    .then((response) => ({
      contributions : {
        validated: response.approvedContributions,
        pending: response.pendingContributions,
      },
      users: {
        totalContributors: response.totalContributors,
        totalAdmins: response.totalAdmins,
      }
    }))
};

export default function Dashboard() {
  const history = useHistory();
  const { userCredentials, token, isLoggedIn } = useContext(UserCredentials);
  const [showNewRef, setShowNewRef] = useState(false);
  const [allUsers, setAllUsers] = useState({
    totalContributors: 0,
    totalAdmins: 0,
  });
  const [contributions, setContributions] = useState({
    validated: 0,
    pending: 0,
  });
  
  // TODO: do we really need a variable for that?
  const changeIsClicked = () => setShowNewRef(!showNewRef);


  // If user is authentified, then counters are loaded depending on their role
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth/signin");
    } else {

      // Data retrieval based on role, contributor or larger
      const fetchData = async () => {
        if (userCredentials.role > roles.CONTRIBUTOR) {
          const { contributions, users } = await getAdminCounters(token)
          setContributions(contributions)
          setAllUsers(users)
        } else {
          const { contributions } = await getContributorCounters(token)
          setContributions(contributions)
        }
      }

      fetchData()
    }
  }, [isLoggedIn, token, userCredentials, history, setContributions, setAllUsers]);

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
            : <MainDashboard contributions={contributions} users={userCredentials.role >= roles.MODERATOR ? allUsers : {}} />
          }
        </div>
      </div>
    )
  );
}
