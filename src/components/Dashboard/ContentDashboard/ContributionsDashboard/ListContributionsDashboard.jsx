import React, { useContext } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import { UserCredentials, AllSections } from "../../../../App";

import { AiOutlineFundProjectionScreen, AiFillCloseCircle } from "react-icons/ai";
import {
  GiInjustice,
  GiPaintBrush,
  GiPerson,
  GiNewspaper,
  GiBookCover,
} from "react-icons/gi";

import roles from "../../../../utils/roles";

const setIcon = (categoryName) => {
  switch (categoryName) {
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


export default function ContributionsDashboard({ contributions, title, setEditContribution }) {
  const { userCredentials } = useContext(UserCredentials);
  const { sections } = useContext(AllSections);
  const history = useHistory();

  return (
    <div className="mb-5">
      <p className="dashboard-title">{title}</p>
      {contributions
        .sort((a, b) => {
          if (a.status) {
            return a.category_name.localeCompare(b.category_name);
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
              {setIcon(contribution.section)}
              {contribution.category_label}
            </p>
            <p className="reflist-div">{contribution.name}</p>
            <p className="reflist-div">{contribution.user_name}</p>
            
          </article>
        ))}
      <hr className="m-6" />
    </div>
  );
}