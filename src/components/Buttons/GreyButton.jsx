import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

export default function GreyButton({ category }) {
  return (
    <button key={uuidv4()} className="widget-btn pointer">
      {category.label
        ? category.label.charAt(0).toUpperCase() +
          category.label.slice(1).replace(/-/g, " ")
        : category.charAt(0).toUpperCase() +
          category.slice(1).replace(/-/g, " ")}
    </button>
  );
}

GreyButton.propTypes = {
  category: PropTypes.string.isRequired,
};
