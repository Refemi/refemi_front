import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// JS
import http from "../services/http-common";
import roles from "../utils/roles";

// Components
import HeaderDashboard from "../components/Dashboard/ContentDashboard/HeaderDashboard";
import MainDashboard from "../components/Dashboard/ContentDashboard/MainDashboard";
import AddReference from "../components/Dashboard/FormDashboard/AddReference";
import AddTheme from "../components/Dashboard/FormDashboard/AddTheme";

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

const renderNew = (showNew) => {
  switch (showNew) {
    case 'reference':
      return <AddReference />
    case 'theme':
      return <AddTheme />
    default:
      return null
  }
}

// COMPONENT
export default function Dashboard() {
  const history = useHistory();
  const { userCredentials, token, isLoggedIn } = useContext(UserCredentials);
  const [showNew, setShowNew] = useState(undefined);
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
            setShowNew={setShowNew}
          />

          {showNew !== undefined
            ? <section className="dashboard-content borders is-flex is-flex-direction-column is-align-items-center mt-6">
                <article className="is-flex is-flex-direction-row is-align-self-flex-end">
                  <button
                    className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
                    onClick={() => setShowNew(undefined)}
                  >
                    Retour à mes contributions
                  </button>
                </article>
                {renderNew(showNew)}
              </section>
            : <MainDashboard contributions={contributions} />
          }
        </section>
      </main>
    )
  );
}
