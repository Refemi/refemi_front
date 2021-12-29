import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import "../css/widget.css";

// COMPONENT
export default function WidgetCat({ categories }) {
  const [isShown, setIsShown] = useState(true);
  // TODO: Turn this into a fixed sidebar

  return (
      <section className="widget borders flex">
        <button
          className="show-btn margin5"
          onClick={() => setIsShown(!isShown)}
        >
          {isShown ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </button>

        {isShown && (
          <ul className=" flex borders">
            {categories.map((category) => (
              <li>
              <a
                key={uuidv4()}
                href={`#${category.name ? category.name : category}`}
                className="link-no-decoration main-text-color widget-link"
              >
                <button key={category.id} className="widget-btn pointer">
                  {category.label ? category.label : category}
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
