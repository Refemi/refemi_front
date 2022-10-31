import React, { createContext, useContext, useEffect, useState } from "react";

// JS + JSON
import roles from "../utils/roles";
import {
  getAllReferences,
  getUserReferences,
  setLoggedOut,
} from "../services/getData";

// Import components
import HeaderDashboard from "../components/Dashboard/ContentDashboard/HeaderDashboard";
import MainDashboard from "../components/Dashboard/ContentDashboard/MainDashboard";
import AddReference from "../components/Dashboard/FormDashboard/AddReference";
import Loader from "../components/Loader";

// Import contexts
import { UserContext } from "../App";

// Create contexts
export const DashboardContext = createContext();

export default function Dashboard() {
  const [showNewRef, setShowNewRef] = useState(false);
  const [contributions, setContributions] = useState({});

  const {
    userCredentials,
    setUserCredentials,
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(UserContext);

  useEffect(() => {
    if (token.length > 0 && Object.entries(contributions).length === 0) {
      (async () => {
        let references = undefined;

        if (userCredentials.role === roles.ADMIN) {
          references = await getAllReferences(
            token,
            setUserCredentials,
            setToken,
            setIsLoggedIn,
            setLoggedOut
          );
        } else {
          references = await getUserReferences(
            token,
            setUserCredentials,
            setToken,
            setIsLoggedIn,
            setLoggedOut
          );
        }

        if (references !== undefined) {
          setContributions(references);
        }
      })();
    }
  }, [
    userCredentials,
    token,
    setUserCredentials,
    setToken,
    setIsLoggedIn,
    contributions,
  ]);

  return (
    isLoggedIn && (
      <main className="is-flex is-justify-content-center is-flex-direction-column dashboard">
        {Object.entries(contributions).length === 0 ? (
          <Loader />
        ) : (
          <section>
            <DashboardContext.Provider value={{ contributions, setShowNewRef }}>
              <HeaderDashboard />
              {showNewRef ? <AddReference /> : <MainDashboard />}
            </DashboardContext.Provider>
          </section>
        )}
      </main>
    )
  );
}
