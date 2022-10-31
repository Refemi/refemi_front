import React from "react";
import PropTypes from "prop-types";

// COMPONENT
export default function CounterLabel({ label }) {
  return (
    <p className="is-align-self-center is-uppercase has-text-centered counter-text">
      {label}
    </p>
  );
}

CounterLabel.propTypes = {
  label: PropTypes.string,
};
