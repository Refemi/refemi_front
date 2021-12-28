import React, { useContext } from 'react'

import { UserCredentials } from "../../../App"

import ContributionsDashboard from './ContributionsDashboard'
import roles from '../../../utils/roles'

// Rendering for a contributing member
const renderContributorDashboard = (contributions) => {
  return (
    <>
      {contributions.validated > 0 && (
        <ContributionsDashboard title="Contributions validées" contributions={contributions.validated} />
      )}
      {contributions.pending > 0 && (
        <ContributionsDashboard title="Contributions en attente" contributions={contributions.pending} />
      )}
    </>
  )
}

// COMPONENT
export default function MainDashboard({ contributions }) {
    const { userCredentials } = useContext(UserCredentials)

    return (
      <div className="dashboard dashboard-content borders">
        {contributions.validated === 0 && contributions.pending === 0
          && (<p>Aucune contribution validée</p>)
        }
        {/* TODO: render admin dashboard */}
        {userCredentials.role === roles.CONTRIBUTOR
          ? renderContributorDashboard(contributions)
          : null
        }
      </div>
    )
}