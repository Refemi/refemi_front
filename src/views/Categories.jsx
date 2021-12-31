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
    <main className="categories">
      <ul className="is-flex is-flex-wrap-wrap is-justify-content-center ">
        {sections.map((category, index) => (
          <li
            key={category.id}
            className="cat-box is-relative m-6 alternate-bg pointer"
            onClick={() => history.push(`/categories/${category.name}`)}
          >
            <span
              key={index}
              className="position-absolute-icon category-icon has-text-white"
            >
              {setIcon(category.label)}
            </span>
            <p
              key={category.id}
              className="cat-description description-center has-text-centered has-text-weight-bold"
              style={{ position: "absolute" }}
            >
              {category.label.toUpperCase()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
