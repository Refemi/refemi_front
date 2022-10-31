import React from "react";
import PropTypes from "prop-types";

// COMPONENT
export default function CounterBox({ value }) {
  return (
    <div className="counter-box box is-flex is-justify-content-center is-align-items-center">
      <p className="counter-value">{value}</p>
    </div>
  );
}

CounterBox.propTypes = {
  value: PropTypes.number,
};
