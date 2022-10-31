import React, { useContext } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

// Import Contexts
import { DataContext, UserContext } from "../../../App";
import { MainContext } from "./MainDashboard";

// Import globals
import roles from "../../../utils/roles";
import { switchIcon } from "../../../utils/switchOptions";

export default function ContributionsDashboard({ title, contributions }) {
  const { userCredentials } = useContext(UserContext);
  const { sections, categories } = useContext(DataContext);
  const { setEditContribution } = useContext(MainContext);
  const history = useHistory();

  return (
    <section className="margin-bottom">
      {sections.length > 0 && categories.length > 0 && (
        <article>
          <p className="dashboard-title">{title}</p>
          {contributions &&
            contributions
              .sort((a, b) => {
                if (a.status) {
                  return a.category - b.category;
                } else {
                  return a.contributor - b.user_name;
                }
              })
              .map((contribution) => (
                <article
                  key={contribution.id}
                  id={contribution.id}
                  className="description-center-reference borders is-flex is-justify-content-space-between line m-3 p-3"
                  onClick={() => {
                    if (contribution.status) {
                      if (userCredentials.role !== roles.ADMIN) {
                        history.push(`/references/${contribution.id}`);
                      } else {
                        setEditContribution(contribution);
                      }
                    } else {
                      setEditContribution(contribution);
                    }
                  }}
                >
                  <p className="reflist-div is-inline-flex">
                    {
                      // Retrieving the name of the section of the category
                      sections.length > 0 &&
                        categories &&
                        switchIcon(
                          sections.filter(
                            (section) =>
                              categories.find(
                                (category) =>
                                  contribution.category_id === category.id
                              ).section_id === section.id
                          )[0].label
                        )
                    }
                  </p>
                  <p className="reflist-div">{contribution.name}</p>
                  <p className="reflist-div">{contribution.user_name}</p>
                </article>
              ))}
          <hr className="m-6" />
        </article>
      )}
    </section>
  );
}

ContributionsDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  contributions: PropTypes.array.isRequired,
};
