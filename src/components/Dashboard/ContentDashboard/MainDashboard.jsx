import React, { useContext } from "react";

import { UserCredentials } from "../../../App";

import ContributionsDashboard from "./ContributionsDashboard";
import roles from "../../../utils/roles";

// Rendering for a contributing member
const renderContributorDashboard = (contributions) => {
  return (
    <>
      {contributions.validated > 0 && (
        <ContributionsDashboard
          title="Contributions validées"
          contributions={contributions.validated}
        />
      )}
      {contributions.pending > 0 && (
        <ContributionsDashboard
          title="Contributions en attente"
          contributions={contributions.pending}
        />
      )}
    </>
  );
};

const renderAdminDashboard = (contributions) => {
  const rContributions = contributions.reduce((filter, contribution) => {
    if (contribution.status) {
      filter.validated.push(contribution);
    } else {
      filter.pending.push(contribution);
    }
    return filter;

  }, {
    validated: [],
    pending: []
  });

  return (
    <>
      {rContributions.pending.length > 0 && (
        <ContributionsDashboard
          title="Contributions en attente"
          contributions={rContributions.pending}
        />
      )}
      {rContributions.validated.length > 0 && (
        <ContributionsDashboard
          title="Contributions validées"
          contributions={rContributions.validated}
        />
      )}
    </>
  );
};

// COMPONENT
export default function MainDashboard({ contributions }) {
  const { userCredentials } = useContext(UserCredentials);

  return (
    <article className="dashboard-content borders mt-6">
      {contributions.length === 0 && (
        <p>Aucune contribution validée</p>
      )}
      {/* TODO: render admin dashboard */}
      {userCredentials.role === roles.ADMIN
        ? renderAdminDashboard(contributions)
        : null}
    </article>
  );
}
