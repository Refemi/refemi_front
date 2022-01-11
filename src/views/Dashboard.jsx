import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// JS
import http from "../services/http-common";
import roles from "../utils/roles";

// Components
import HeaderDashboard from "../components/Dashboard/ContentDashboard/HeaderDashboard";
import MainDashboard from "../components/Dashboard/ContentDashboard/MainDashboard";
import AddReference from "../components/Dashboard/FormDashboard/AddReference";

// Context
import { UserCredentials } from "../App";

const getAllReferences = async (token) => {
  return await http
    .get("references/all/references")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => ({
      references: data.references,
      totalValidated: data.references.filter((reference) => reference.status === true).length,
      totalPending: data.references.filter((reference) => reference.status === false).length
    }));
};
const getUserReferences = async (token, userName) => {
  return await http
    .get(`references/users/${userName}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => ({
      references: data.references,
      totalValidated: data.references.filter((reference) => reference.status === true).length,
      totalPending: data.references.filter((reference) => reference.status === false).length
    }))
    .catch((error) => {
      console.log(error)
    });
};
const getUserCounters = async (token) => {
  return await http
    .get("counter/dashboard/admin", { headers: { "x-access-token": token } })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => ({
      totalContributors: data.totalContributors,
      totalAdmins: data.totalAdmins,
    }));
};

// COMPONENT
export default function Dashboard() {
  const history = useHistory();
  const { userCredentials, token, isLoggedIn } = useContext(UserCredentials);
  const [showNewRef, setShowNewRef] = useState(false);
  const [userCounters, setUserCounters] = useState({
    totalContributors: 0,
    totalAdmins: 0,
  });
  const [contributions, setContributions] = useState([]);
  const [contributionCounters, setContributionCounters] = useState({
    totalValidated: 0,
    totalPending: 0
  });

  // If user is authentified, then counters are loaded depending on their role
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth/signin");
    } else {
      // Data retrieval based on role, contributor or larger
      const fetchData = async () => {
        if (userCredentials.role !== roles.CONTRIBUTOR) {
          const { references, totalValidated, totalPending } = await getAllReferences();

          setContributions(references);
          setContributionCounters({
            totalValidated,
            totalPending
          })
          
          const { totalContributors, totalAdmins } = await getUserCounters(token);
          setUserCounters({
            totalContributors,
            totalAdmins
          })
          //setAllUsers(users);
        } else {
          const { references, totalValidated, totalPending } = await getUserReferences(token, userCredentials.name);

          setContributions(references);
          setContributionCounters({ totalValidated, totalPending });
        }
      };

      fetchData();
    }
  }, [
    isLoggedIn,
    token,
    userCredentials,
    history,
    setContributions,
  ]);

  return (
    isLoggedIn && (
      <main className="dashboard">
        <section className="is-flex is-justify-content-center is-flex-direction-column">
          <HeaderDashboard
            contributions={contributionCounters}
            users={userCounters}
            setShowNewRef={setShowNewRef}
          />

          {showNewRef
          ? (
            <AddReference closeNewRef={() => setShowNewRef(false)} />
          ) : (
            <MainDashboard
              contributions={contributions}
            />
          )}
        </section>
      </main>
    )
  );
}
