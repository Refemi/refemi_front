import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router";

// import components
import ContributionsDashboard from "./ContributionsDashboard";
import FormReference from "../FormDashboard/FormReference";
import Loader from "../../Loader";

// Import Contexts
import { DataContext } from "../../../App";
import { DashboardContext } from "../../../views/Dashboard";

// JS + JSON
import translationKeys from "../../../utils/translationKeys.json";

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
  const frenchKeys = translationKeys[0].french;
  const [editContribution, setEditContribution] = useState({});
  const history = useHistory();

  const { categories } = useContext(DataContext);
  const { contributions } = useContext(DashboardContext);

  // Render the dashboard if no contribution to validate / modify, the form otherwise
  return (
    <article className="dashboard dashboard-content mt-6">
      {contributions.pending.length == 0 &&
        contributions.validated.length == 0 && (
          <p>{frenchKeys.noContribution}</p>
        )}

      <MainContext.Provider value={{ setEditContribution }}>
        {contributions.length == 0 && <Loader />}
        {Object.entries(editContribution).length > 0 &&
        categories.length > 0 ? (
          <div>
            <button
              onClick={() => setEditContribution({})}
              className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
            >
              {frenchKeys.backToDashboard}
            </button>

            {editContribution.status && (
              <button
                onClick={() =>
                  history.push(`/references/${editContribution.id}`)
                }
                className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
              >
                {frenchKeys.seeContribution}
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
