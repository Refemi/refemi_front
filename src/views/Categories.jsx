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
import { v4 as uuidv4 } from "uuid";

// Context
import { DataContext } from "../App";

import Loader from "../components/Loader";
import Error from "../components/Error";

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
  const { sections } = useContext(DataContext);
  const history = useHistory();

  return !sections ? (
    <Error errorCode={404} message="Impossible de trouver les sections" />
  ) : (
    <main className="categories">
      {sections.length === 0 ? (
        <Loader />
      ) : (
        <ul className="is-flex is-flex-wrap-wrap is-justify-content-center ">
          {sections.map((category) => (
            <li
              key={uuidv4()}
              className="cat-box is-relative m-6 alternate-bg pointer"
              onClick={() => history.push(`/categories/${category.name}`)}
            >
              <span
                key={uuidv4()}
                className="position-absolute-icon category-icon has-text-white"
              >
                {setIcon(category.label)}
              </span>
              <p
                key={uuidv4()}
                className="cat-description description-center has-text-centered has-text-weight-bold"
                style={{ position: "absolute" }}
              >
                {category.label.toUpperCase()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
