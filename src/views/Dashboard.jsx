import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// Import components
import HeaderDashboard from "../components/Dashboard/ContentDashboard/HeaderDashboard";
import MainDashboard from "../components/Dashboard/ContentDashboard/MainDashboard";
import AddReference from "../components/Dashboard/FormDashboard/AddReference";

// Import contexts
import { DataContext, UserContext } from "../App";

export const DashboardContext = createContext();


/**
 * 
 * @returns {JSX.Element} 
 */
export default function Dashboard() {
  const [showNewRef, setShowNewRef] = useState(false);
  const [contributions, setContributions] = useState({});

  const history = useHistory();
  const { isLoggedIn } = useContext(UserContext);
  const { references } = useContext(DataContext);

  useEffect(() => {
    if (references.length > 0) {
      setContributions(references.reduce((filter, reference) => {
        if (reference.status) {
          filter.validated.push(reference);
        } else {
          filter.pending.push(reference);
        }
        return filter;
      }, {
        validated: [],
        pending: []
      }));
    }
  }, [references])

  // If user is authentified, then counters are loaded depending on their role
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth/signin");
    }
  }, [isLoggedIn, history]);

  return (
    isLoggedIn && Object.entries(contributions).length
      ? (
        <main className="dashboard">
          <section className="is-flex is-justify-content-center is-flex-direction-column">
            <DashboardContext.Provider value ={{ contributions, setShowNewRef }}>
              <HeaderDashboard />

              {showNewRef
                ? (<AddReference />)
                : (<MainDashboard />)
              }
            </DashboardContext.Provider>
          </section>
        </main>
      )
    : null
  );
}
