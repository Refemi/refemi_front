import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// Import Contexts
import { DataContext } from "../../../App";
import { DashboardContext } from "../../../views/Dashboard";

import ContributionsDashboard from "./ContributionsDashboard";
import FormReference from "../FormDashboard/FormReference";

export const MainContext = createContext();

// Rendering for a contributing member
// TODO : refacto and take this component out of here
const renderDashboard = (contributions) => {
  if (contributions.length === 0) {
    return <p>Aucune contribution validée</p>;
  } else {
    return (
      <section>
        {contributions.pending.length > 0 && (
          <ContributionsDashboard
            title="Contributions en attente"
            contributions={contributions.pending}
          />
        )}
        {contributions.validated.length > 0 && (
          <ContributionsDashboard
            title="Contributions validées"
            contributions={contributions.validated}
          />
        )}
      </section>
    );
  }
};

// COMPONENT
export default function MainDashboard() {
  const [editContribution, setEditContribution] = useState({});
  const history = useHistory();

  const { categories } = useContext(DataContext);
  const { contributions } = useContext(DashboardContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Render the dashboard if no contribution to validate / modify, the form otherwise
  return (
    <article className="dashboard dashboard-content borders mt-6">
      <MainContext.Provider value={{ setEditContribution }}>
        {Object.entries(editContribution).length > 0 &&
        categories.length > 0 ? (
          <div>
            <button
              onClick={() => setEditContribution({})}
              className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
            >
              Retour au Tableau de bord
            </button>

            {editContribution.status && (
              <button
                onClick={() =>
                  history.push(`/references/${editContribution.id}`)
                }
                className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
              >
                Voir la contribution
              </button>
            )}
            <FormReference
              category={editContribution.category_id}
              reference={editContribution}
            />
          </div>
        ) : (
          renderDashboard(contributions)
        )}
      </MainContext.Provider>
    </article>
  );
}
