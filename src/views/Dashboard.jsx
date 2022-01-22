import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import http from '../services/http-common';
import roles from '../utils/roles';

// Import components
import HeaderDashboard from '../components/Dashboard/ContentDashboard/HeaderDashboard';
import MainDashboard from '../components/Dashboard/ContentDashboard/MainDashboard';
import AddReference from '../components/Dashboard/FormDashboard/AddReference';

// Import contexts
import { UserContext } from '../App';

// Create contexts
export const DashboardContext = createContext();

const getAllReferences = async (token) => {
  return await http(token)
    .get('/references')
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } 
    })
    .then(({ references }) => references)
}
const getUserReferences = async (token) =>  await http(token)
  .get('/references/user/')
  .then(response => {
    if (response.status === 200) {
      return response.data;
    }
  })
  .then(({ references }) => references)

/**
 * 
 * @returns {JSX.Element} 
 */
export default function Dashboard() {
  const [showNewRef, setShowNewRef] = useState(false);
  const [contributions, setContributions] = useState({});

  const history = useHistory();
  const { userCredentials, token, isLoggedIn } = useContext(UserContext);

  // If user is authentified, then counters are loaded depending on their role
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth/signin");
    }
  }, [isLoggedIn, history]);
  
  useEffect(() => {
    if (Object.entries(contributions).length === 0) {
      (async () => Object.entries(userCredentials).length > 0 && (
        userCredentials.role === roles.ADMIN
          ? setContributions(await getAllReferences(token))
          : setContributions(await getUserReferences(token))
      ))();
    }
  }, [userCredentials, token, contributions]);

  return (
    isLoggedIn && Object.entries(contributions).length && (
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
  );
}
