import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "../css/categories.css";

// React icons
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

const setIcon = (categoryName) => {
  // Show icon depending on category
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

export default function Categories() {
  const { sections } = useContext(AllSections);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="flex flex-wrap justify-center margin-top10"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      {sections.map((category, index) => (
        <div
          key={category.id}
          className="cat-box position-relative margin10 alternate-bg borders pointer"
          onClick={() => history.push(`/categories/${category.name}`)}
        >
          <div key={index} className="position-absolute-icon icon">
            {setIcon(category.label)}
          </div>
          <p
            key={category.id}
            className="cat-description description-center text-center borders align-self-center"
            style={{ position: "absolute", left: "2rem", bottom: "-4vh" }}
          >
            {category.label.toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  );
}
