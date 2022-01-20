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

export const DashboardContext = createContext();

const getAllReferences = async (token) => {
  return await http
    .get('/references', { headers: { 'x-access-token': token }})
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } 
    })
    .then(({ references }) => references)
}
const getUserReferences = async (userId, token) => {
  return await http
    .get(`/references/user/${userId}`, { header: { 'x-access-token': token }})
    .then(response => {
      if (response.response === 200) {
        return response.data;
      }
    })
    .then(data => data)
}


/**
 * 
 * @returns {JSX.Element} 
 */
export default function Dashboard() {
  const [showNewRef, setShowNewRef] = useState(false);
  const [contributions, setContributions] = useState({});

  const history = useHistory();
  const { userCredentials, token, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (Object.entries(contributions).length === 0) {
      (async () => Object.entries(userCredentials).length > 0 && (
        userCredentials.role === roles.ADMIN
          ? setContributions(await getAllReferences(token))
          : setContributions(await getUserReferences())
      ))();
    }
  }, [userCredentials, token, contributions]);

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
