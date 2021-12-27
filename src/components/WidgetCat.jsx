import React, { useState } from "react";
import PropTypes from "prop-types";

import "../css/widget.css";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function WidgetCat({ categories }) {
  // TO DO: create a condition to show sections if widget appears in themes or countries

  const [isShown, setIsShown] = useState(true);

  return (
    <div className="position-relative">
      <div className="widget borders flex">
        <button
          className="show-btn margin5"
          onClick={() => setIsShown(!isShown)}
        >
          {isShown ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </button>

        {isShown && (
          <div className="flex borders">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.name}`}
                className="link-no-decoration main-text-color widget-link"
              >
                <button key={category.id} className="widget-btn pointer">
                  {category.label}
                </button>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

WidgetCat.propTypes = {
  categories: PropTypes.array.isRequired,
};
