import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import http from "../../../services/http-common";

import { UserCredentials } from "../../../App";

import ContributionsDashboard from "./ContributionsDashboard";
import FormReference from "../FormDashboard/FormReference";


const getCategories = async (currentSection) => {
  return await http
    .get(`categories/${currentSection}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ subCategories}) => {
      return subCategories
    });
}

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
  const [categories, setCategories] = useState([]);
  const [editContribution, setEditContribution] = useState({});
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (Object.entries(editContribution).length > 0) {
      const fetchData = async () => {
        setCategories(await getCategories(editContribution.section));
      }

      fetchData()
    }
  }, [editContribution])


  // Render the dashboard if no contribution to validate / modify, the form otherwise 
  return (
    <article className="dashboard-content borders mt-6">
      {Object.entries(editContribution).length > 0 && categories.length > 0
        ? <>
            <button
              onClick={() => setEditContribution({})}
              className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
            >
              Retour au Tableau de bord
            </button>
            {editContribution.status && (
              <button
                onClick={() => history.push(`/references/${editContribution.id}`)}
                className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
              >
                Voir la contribution
            </button>
            )}
            <FormReference category={editContribution.category_name} categories={categories} reference={editContribution} />
            
          </>
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