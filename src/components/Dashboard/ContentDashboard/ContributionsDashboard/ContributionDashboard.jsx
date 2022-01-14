import React, { useContext } from "react";
import PropTypes from "prop-types";

import { UserCredentials } from "../../../../App";

import ListContributionsDashboard from './ListContributionsDashboard'

export default function ContributionDashboard({ contributions, setEditContribution }) {
  const { userCredentials } = useContext(UserCredentials);

  return (Object.entries(contributions).length > 0 && (
    <>
      {contributions.pending.length > 0 && (
        <ListContributionsDashboard
          title="Contributions en attente"
          contributions={contributions.pending}
          type={userCredentials.role}
          setEditContribution={setEditContribution}
        />
      )}
      {contributions.validated.length > 0 && (
        <ListContributionsDashboard
          title="Contributions validées"
          contributions={contributions.validated}
          type={userCredentials.role}
          setEditContribution={setEditContribution}
        />
      )}
    </>
  ))
}