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

/**
 * Disconnect the user if the connection is corrupted (expired token)
 * @param {function} setUserCredentials 
 * @param {function} setToken 
 * @param {function} setIsLoggedIn 
 * @return void
 */
const setLoggedOut = (setUserCredentials, setToken, setIsLoggedIn) => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  setUserCredentials({});
  setToken(null);
  setIsLoggedIn(false);
}
/**
 * Retrieve all references 
 * @param {string} token 
 * @param {function} setUserCredentials 
 * @param {function} setToken 
 * @param {function} setIsLoggedIn 
 * @returns {object} references stored in an object by status (validated or pending)
 */
const getAllReferences = async (token, setUserCredentials, setToken, setIsLoggedIn) => {
  return await http(token)
    .get('/references')
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } 
    })
    .then(({ references }) => references)
    .catch((error) => {
      if (error.response.status === 498) {
        setLoggedOut(setUserCredentials, setToken, setIsLoggedIn);
      }
    });
}
/**
 * Retrieve all user references 
 * @param {string} token 
 * @param {function} setUserCredentials 
 * @param {function} setToken 
 * @param {function} setIsLoggedIn 
 * @returns {object} references stored in an object by status (validated or pending)
 */
const getUserReferences = async (token, setUserCredentials, setToken, setIsLoggedIn) => {
  return await http(token)
  .get('/references/user/')
  .then(response => {
    if (response.status === 200) {
      return response.data;
    }
  })
  .then(({ references }) => references)
  .catch((error) => {
    if (error.response.status === 498) {
      setLoggedOut(setUserCredentials, setToken, setIsLoggedIn);
    }
  })
}

/**
 * Dashboard view
 * @returns {JSX.Element} 
 */
export default function Dashboard() {
  const [showNewRef, setShowNewRef] = useState(false);
  const [contributions, setContributions] = useState({});

  const history = useHistory();
  const {
    userCredentials, setUserCredentials,
    token, setToken, 
    isLoggedIn, setIsLoggedIn
  } = useContext(UserContext);

  // If user is authentified, then counters are loaded depending on their role
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/auth/signin");
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (token.length > 0 && Object.entries(contributions).length === 0) {
      (async () => {
        let references = undefined;

        if (userCredentials.role === roles.ADMIN) {
          references = await getAllReferences(token, setUserCredentials, setToken, setIsLoggedIn)
        } else {
          references = await getUserReferences(token, setUserCredentials, setToken, setIsLoggedIn)
        }
        
        if (references !== undefined) {
          setContributions(references);
        }
      })();
    }
  }, [
    userCredentials, token,
    setUserCredentials, setToken, setIsLoggedIn,
    contributions
  ]);

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
