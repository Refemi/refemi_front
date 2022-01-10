import React, { useContext } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import { UserCredentials, AllSections } from "../../../App";

import "../../../utils/roles";
import roles from "../../../utils/roles";

export default function ContributionsDashboard({ contributions, title, setEditContribution }) {
  const { userCredentials } = useContext(UserCredentials);
  const { sections } = useContext(AllSections);
  const history = useHistory();

  return (
    <div className="margin-bottom">
      <p className="dashboard-title">{title}</p>
      {contributions
        .sort((a, b) => {
          if (a.status) {
            return a.category.localeCompare(b.category_name);
          } else {
            return a.user_name.localeCompare(b.user_name);
          }
        })            
        .map((contribution) => (
          <article
            key={contribution.id}
            id={contribution.id}
            className="description-center-reference borders is-flex is-justify-content-space-between line m-3 p-3"
            onClick={() => {
              if (contribution.status) {
                if (userCredentials.role === roles.CONTRIBUTOR) {
                  history.push(`/references/${contribution.id}`);
                } else {
                  setEditContribution(contribution);
                }
              } else {
                setEditContribution(contribution);
              }
            }}
          >
            <p className="reflist-div">{sections.find(section => section.name, contribution.category).label}</p>
            <p className="reflist-div">{contribution.name}</p>
            <p className="reflist-div">{contribution.user_name}</p>
            
          </article>
        ))}
      <hr className="m-6" />
    </div>
  );
}

ContributionsDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  contributions: PropTypes.array.isRequired,
  setEditContribution: PropTypes.func
};

ContributionsDashboard.defaultProps = {
  setEditContribution: void(0)
};
