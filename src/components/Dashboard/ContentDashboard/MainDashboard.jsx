import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import http from "../../../services/http-common";

import ContributionsDashboard from "./ContributionsDashboard/ContributionDashboard";
import ThemesDashboard from "./ThemesDashboard/ThemesDashboard";
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

const renderTabs = (currentTab, data, setEdit) => {
  switch (currentTab) {
    case "contributions":
      return (
        <ContributionsDashboard
          contributions={data.reduce((filter, contribution) => {
            if (!contribution.status) {
              filter.pending.push(contribution);
            } else {
              filter.validated.push(contribution);
            }

            return filter
          }, { validated: [], pending: [] })}
          setEditContribution={setEdit}
        />
      )
    case "themes":
      return (
        <ThemesDashboard
          themes={data.reduce((filter, theme) => {
            if (!theme.active) {
              filter.pending.push(theme);
            } else {
              filter.active.push(theme);
            }

            console.log(filter)

            return filter
          }, { active: [], pending: [] })}
        />
      )
    default:
      return null
  }
}


// COMPONENT
export default function MainDashboard({ contributions, themes }) {
  const [categories, setCategories] = useState([]);
  const [editContribution, setEditContribution] = useState({});
  const [currentTab, setCurrentTab] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (currentTab === "") {
      setCurrentTab("contributions");
      return
    }

    switch (currentTab) {
      case "contributions":
        setCurrentData(contributions);
        break;
      case "themes":
        console.log('setCurrentTab')
        setCurrentData(themes);
        break;
      default:
        setCurrentData([]);
    }
    console.log('useState', currentTab)

    window.scrollTo(0, 0);
  }, [currentTab, contributions, themes]);

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
    <section className="dashboard-content borders mt-6">
      {Object.entries(editContribution).length > 0 && categories.length > 0
        ? <article>
            <button
              onClick={() => setEditContribution({})}
              className="pointer send-btn darkblue-bg has-text-white mb-5"
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
          </article>
        : <>
            <aside>
              <div className="navbar-menu">
                <div className="navbar-start">
                  <span
                    className={`navbar-item ${currentTab === "contributions" ? "active": "pointer"}`}
                    onClick={() => currentTab !== "reference" && setCurrentTab("contributions")}
                  >
                    Contributions
                  </span>
                </div>
                <div className="navbar-start">
                  <span
                    className={`navbar-item ${currentTab === "themes" ? "active" : "pointer"}`}
                    onClick={() => currentTab !== "themes" && setCurrentTab("themes")}
                  >
                    Thèmes
                  </span>
                </div>
              </div>
            </aside>

            {currentData.length > 0 && (
              renderTabs(currentTab, currentData, setEditContribution)
            )}
          </>
      }
    </section>
  );
}

MainDashboard.propTypes = {
  contributions: PropTypes.array.isRequired,
};