import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack } from "react-icons/io";

// Component
import GreyButton from "./Buttons/GreyButton";

// TODO: Turn this into a fixed sidebar
export default function WidgetCat({ categories = [] }) {
  const [isShown, setIsShown] = useState(false);

  const showCategories = () => {
    return setIsShown(!isShown);
  };

  return (
    <section className="widget borders is-flex mt-6">
      <button className="show-btn p-3" onClick={showCategories}>
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
                <GreyButton
                  key={uuidv4()}
                  className="widget-btn pointer"
                  category={category}
                />
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
