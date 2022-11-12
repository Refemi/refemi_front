import React from "react";
import PropTypes from "prop-types";

export default function MenuButton({ className, onClick, label }) {
  return (
    <button id="dropdown" onClick={onClick} className={`menu-btn ${className}`}>
      {label}
    </button>
  );
}

MenuButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
};
