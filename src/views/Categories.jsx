import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import {
  GiInjustice,
  GiPaintBrush,
  GiPerson,
  GiNewspaper,
  GiBookCover,
} from "react-icons/gi";

// Context
import { AllSections } from "../App";

import "../css/categories.css";

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
export default function Categories() {
  const { sections } = useContext(AllSections);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="margin-top10"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <ul className="flex is-flex-wrap-wrap is-justify-content-center ">
        {sections.map((category, index) => (
          <li
            key={category.id}
            className="cat-box position-relative m-6 alternate-bg borders pointer"
            onClick={() => history.push(`/categories/${category.name}`)}
          >
            <span key={index} className="position-absolute-icon icon">
              {setIcon(category.label)}
            </span>
            <p
              key={category.id}
              className="cat-description description-center text-center borders is-align-self-center"
              style={{ position: "absolute", left: "2rem", bottom: "-4vh" }}
            >
              {category.label.toUpperCase()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
