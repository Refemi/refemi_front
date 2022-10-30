import React from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import {
  GiInjustice,
  GiPaintBrush,
  GiPerson,
  GiNewspaper,
  GiBookCover,
} from "react-icons/gi";

// Show icon depending on category
const setIcon = (categoryName) => {
  switch (categoryName) {
    case "Audiovisuel":
      return <AiOutlineFundProjectionScreen size={100} />;
    case "Juridique & Militantisme":
      return <GiInjustice size={100} />;
    case "Art & Jeunessse":
      return <GiPaintBrush size={100} />;
    case "Portraits & Vocabulaire":
      return <GiPerson size={100} />;
    case "Presse & Internet":
      return <GiNewspaper size={100} />;
    case "Lectures":
      return <GiBookCover size={100} />;
    default:
      return null;
  }
};

// COMPONENT
export default function Section(categoryLabel, categoryName) {
  const history = useHistory();

  console.log(categoryName);

  return (
    <li
      key={uuidv4()}
      className="cat-box is-relative m-6 alternate-bg pointer"
      onClick={() => history.push(`/categories/${categoryName}`)}
    >
      <span
        key={uuidv4()}
        className="position-absolute-icon category-icon has-text-white"
      >
        {setIcon(categoryLabel)}
      </span>
      <p
        key={uuidv4()}
        className="cat-description description-center has-text-centered has-text-weight-bold"
        style={{ position: "absolute" }}
      >
        {categoryLabel}
      </p>
    </li>
  );
}
