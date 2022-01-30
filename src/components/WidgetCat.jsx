import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack } from "react-icons/io";

/**
 * WidgetCat component
 * @param {array} categories
 * @returns {JSX.Element} WigdetCat
 */
export default function WidgetCat({ categories = [] }) {
  const [isShown, setIsShown] = useState(false);
  // TODO: Turn this into a fixed sidebar

  return (
    <section className="widget borders is-flex">
      <button className="show-btn p-3" onClick={() => setIsShown(!isShown)}>
        {isShown ? <IoIosArrowBack /> : "Voir les catégories"}
      </button>

      {isShown && (
        <ul className="is-flex is-flex-wrap-wrap is-align-items-center">
          {categories.map((category) => (
            <li key={uuidv4()}>
              <HashLink
                key={uuidv4()}
                to={`#${category.name ? category.name : category}`}
                className="widget-link"
              >
                <button key={uuidv4()} className="widget-btn pointer">
                  {category.label
                    ? category.label.charAt(0).toUpperCase() +
                      category.label.slice(1).replace(/-/g, " ")
                    : category.charAt(0).toUpperCase() +
                      category.slice(1).replace(/-/g, " ")}
                </button>
              </HashLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

WidgetCat.propTypes = {
  categories: PropTypes.array.isRequired,
};
