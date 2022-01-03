import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack } from "react-icons/io";

// COMPONENT
export default function WidgetCat({ categories = [] }) {
  const [isShown, setIsShown] = useState(true);
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
              <a
                key={uuidv4()}
                href={`#${category.name ? category.name : category}`}
                className="widget-link"
              >
                <button key={uuidv4()} className="widget-btn pointer">
                  {category.label
                    ? category.label.charAt(0).toUpperCase() +
                      category.label.slice(1).replace(/-/g, " ")
                    : category.charAt(0).toUpperCase() +
                      category.slice(1).replace(/-/g, " ")}
                </button>
              </a>
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
