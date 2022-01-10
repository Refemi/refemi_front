import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { UserCredentials } from "../../../App";

import ContributionsDashboard from "./ContributionsDashboard";
import FormReference from "../FormDashboard/FormReference";

import roles from "../../../utils/roles";

// Rendering for a contributing member
const renderDashboard = (userCredentials, contributions, setEditContribution) => {

  if (contributions.length === 0) {
    return <p>Aucune contribution validée</p>
  } else {
    return (
      <>
        {contributions.pending.length > 0 && (
          <ContributionsDashboard
            title="Contributions en attente"
            contributions={contributions.pending}
            type={userCredentials.role}
            setEditContribution={setEditContribution}
          />
        )}
        {contributions.validated.length > 0 && (
          <ContributionsDashboard
            title="Contributions validées"
            contributions={contributions.validated}
            type={userCredentials.role}
            setEditContribution={setEditContribution}
          />
        )}
      </>
    )
  }
}

// COMPONENT
export default function MainDashboard({ contributions }) {
  const { userCredentials } = useContext(UserCredentials);
  const [editContribution, setEditContribution] = useState({});

  return (
    <article className="dashboard-content borders mt-6">
      {Object.entries(editContribution).length > 0
        ? <FormReference categories={[{ name: "livres-theoriques", label: "Livres théoriques"}]} category="livres-theoriques" reference={editContribution} />
        : renderDashboard(userCredentials, contributions.reduce((filter, contribution) => {
          if (contribution.status) {
            filter.validated.push(contribution);
          } else {
            filter.pending.push(contribution);
          }
      
          return filter;
        }, {
          validated: [],
          pending: []
        })
        , setEditContribution)
      }
    </article>
  );
}

MainDashboard.propTypes = {
  contributions: PropTypes.array.isRequired,
};