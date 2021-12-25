import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import '../css/dashboard.css'
import '../css/counter.css'

import { AiFillPlusCircle } from 'react-icons/ai'
import Counter from '../components/Counter'
import AddReference from '../components/Dashboard/AddReference'

import { UserCredentials } from '../App'

const getAdminCounter = () => {
  fetch('http://localhost:8000/counter/dashboard/admin', { headers: { 'x-access-token': token } })
      .then(response => response.json())
      .then(response => {
        setContributions({
          validated: response.approvedContributions,
          pending: response.pendingContributions
        })

        setAllUsers({
          nbOfContributors: response.totalContributors,
          nbOfAdmins: response.totalAdmins
        })
      })
}

const Dashboard = () => {
  const history = useHistory()
  const { userCredentials, token, isLogged } = useContext(UserCredentials)
  const [showNewRef, setShowNewRef] = useState(false)
  const [allUsers, setAllUsers] = useState({ nbOfContributors: 0, nbOfAdmins: 0 })
  const [contributions, setContributions] = useState({ validated: 0, pending: 0 })

  useEffect(() => {
    !isLogged
      ? history.push('/auth/signin')
      : userCredentials.role > 1
        ? fetch('http://localhost:8000/counter/dashboard/admin', { headers: { 'x-access-token': token } })
          .then(response => response.json())
          .then(response => {
            setContributions({
              validated: response.approvedContributions,
              pending: response.pendingContributions
            })

            setAllUsers({
              nbOfContributors: response.totalContributors,
              nbOfAdmins: response.totalAdmins
            })
          })
        : fetch('http://localhost:8000/counter/dashboard/contributor', { headers: { 'x-access-token': token } })
          .then(response => response.json())
          .then(response => setContributions({
            validated: response.approvedContributions,
            pending: response.pendingContributions
          }))
  }, [isLogged, token, userCredentials])

  useEffect(() => {
    window.scrollY > 0 && window.scrollTo(0, 0)
  }, [])

  const changeIsClicked = () => setShowNewRef(!showNewRef)

  return (
    isLogged && (
      <div className="flex justify-center margin-top10">
        <div className="width80">
          {
            // TODO Créer un composant pour le header du Dashboard
          }
          <div className="flex flex-column justify-around dashboard dashboard-content borders grey-bg-opacity-cat">
            <p>
              Bienvenue, {userCredentials.name}&nbsp;
              <span
                className="pointer white-hover"
                onClick={ () => history.push('/auth/signout') }
              >
                Déconnexion
              </span>
            </p>

            <div className="flex justify-between">
              <Counter
                label="contributions validées"
                value={contributions.validated}
                className="white-bg"
              />

              <Counter
                label="contributions en attente"
                value={contributions.pending}
              />

              {userCredentials.role === 3 && (
                <div className="flex justify-around">
                  <Counter
                    label="contributeurs"
                    value={
                      allUsers.nbOfContributors ? allUsers.nbOfContributors : 0
                    }
                  />

                  <Counter
                    label="admins"
                    value={allUsers.nbOfAdmins ? allUsers.nbOfAdmins : 0}
                  />
                </div>
              )}

              <div className="box justify-center align-center">
                <AiFillPlusCircle
                  onClick={ () => setShowNewRef(true) }
                  size={32}
                  className="pointer"
                />
              </div>
            </div>
          </div>
          {showNewRef
            ? <AddReference changeIsClicked={changeIsClicked} />
            : <div className="dashboard dashboard-content borders">
                  <div className="margin-bottom">
                    {userCredentials.role === 'contributor' && userCredentials.validatedContributions.length > 0 && (
                      <div>
                        <p className="dashboard-title">Contributions validées :</p>
                        {userCredentials.validatedContributions.map((contribution, index) =>
                          <div key={index}>{contribution}</div>
                        )}
                        <hr className="margin7" />
                      </div>
                    )}
                  </div>

                  <div>
                    {userCredentials.role === 'contributor' && userCredentials.pendingContributions.length > 0 && (
                      <div>
                        <p className="dashboard-title">
                          Contributions en attente de validation :
                        </p>

                        {userCredentials.pendingContributions.map((contribution, index) =>
                          <div key={index}>{contribution}</div>
                        )}
                        <hr className="margin7" />
                      </div>
                    )}

                    <div>
                      <p className="dashboard-title">Contributions validées :</p>
                      {/* Ici récupérer la liste de toutes les contributions des contributeurs en attente de validation */}
                    </div>
                  </div>
              </div>
          }
        </div>
      </div>
    )
  )
}

export default Dashboard
