import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// Import Contexts
import { DataContext } from '../../../App';
import { DashboardContext } from '../../../views/Dashboard';

import ContributionsDashboard from './ContributionsDashboard';
import FormReference from '../FormDashboard/FormReference';

export const MainContext = createContext();

// Rendering for a contributing member
const renderDashboard = (contributions) => {
  if (contributions.length === 0) {
    return <p>Aucune contribution validée</p>;
  } else {
    return (
      <>
        {contributions.pending.length > 0 && (
          <ContributionsDashboard
            title='Contributions en attente'
            contributions={contributions.pending}
          />
        )}
        {contributions.validated.length > 0 && (
          <ContributionsDashboard
            title='Contributions validées'
            contributions={contributions.validated}
          />
        )}
      </>
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
    <article className='dashboard-content borders mt-6'>
      <MainContext.Provider value={{ setEditContribution }}>
        {Object.entries(editContribution).length > 0 &&
        categories.length > 0 ? (
          <>
            <button
              onClick={() => setEditContribution({})}
              className='pointer send-btn darkblue-bg has-text-white is-align-self-flex-end'
            >
              Retour au Tableau de bord
            </button>

            {editContribution.status && (
              <button
                onClick={() =>
                  history.push(`/references/${editContribution.id}`)
                }
                className='pointer send-btn darkblue-bg has-text-white is-align-self-flex-end'
              >
                Voir la contribution
              </button>
            )}
            <FormReference
              category={editContribution.category_id}
              reference={editContribution}
            />
          </>
        ) : (
          renderDashboard(contributions)
        )}
      </MainContext.Provider>
    </article>
  );
}
