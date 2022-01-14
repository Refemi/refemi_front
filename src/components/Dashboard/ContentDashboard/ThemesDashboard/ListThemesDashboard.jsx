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


export default function ListThemesDashboard({ theme, setEditTheme }) {
  const { userCredentials } = useContext(UserCredentials);
  const { sections } = useContext(AllSections);
  const history = useHistory();

  return (
    <article
      key={theme.id}
      id={theme.id}
      className="borders is-flex is-justify-content-space-between line m-3 p-3"
      onClick={() => setEditTheme(theme)}
    >
      <p className="reflist-div is-inline-flex">
        {theme.label}
      </p>
    </article>
  );
}