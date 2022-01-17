import React, { useContext } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

// Import Contexts
import { DataContext, UserContext } from "../../../App";
import { MainContext } from "./MainDashboard";

// Import icons
import { AiOutlineFundProjectionScreen, AiFillCloseCircle } from "react-icons/ai";
import {
  GiInjustice,
  GiPaintBrush,
  GiPerson,
  GiNewspaper,
  GiBookCover,
} from "react-icons/gi";

// Import globals
import roles from "../../../utils/roles";

/**
 * @description Display the icon corresponding to the contribution section
 * @param {string} sectionName
 * @returns {JSX.Element}
 */
const setIcon = (sectionName) => {
  switch (sectionName) {
    case "audiovisuel":
      return <AiOutlineFundProjectionScreen size={24} className="mr-3"/>;
    case "juridique-militantisme":
      return <GiInjustice size={24} />;
    case "art-jeunesse":
      return <GiPaintBrush size={24} />;
    case "portraits-vocabulaire":
      return <GiPerson size={24} />;
    case "presse-internet":
      return <GiNewspaper size={24} />;
    case "lectures":
      return <GiBookCover alt="Lectures" size={24} className="mr-3" />;
    default:
      return <AiFillCloseCircle size={24} className="mr-3" />;
  }
};


export default function ContributionsDashboard({ title, contributions }) {
  const { userCredentials } = useContext(UserContext);
  const { categories, sections } = useContext(DataContext);
  const { setEditContribution } = useContext(MainContext);
  const history = useHistory();


  return (
    <div className="margin-bottom">
      <p className="dashboard-title">{title}</p>
      {contributions && contributions
        .sort((a, b) => {
          if (a.status) {
            return a.category - b.category
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
              {sections.length > 0 && setIcon(sections.find((section) => {
                return contribution.section === section.id
              }).name)}
            </p>
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
  contributions: PropTypes.array.isRequired
};
