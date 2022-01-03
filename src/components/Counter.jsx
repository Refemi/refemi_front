import React from "react";

// COMPONENT
export default function Counter({ value = "" }) {
  return (
    <div className="counter-box box is-flex is-justify-content-center is-align-items-center">
      <p className="counter-value">{value}</p>
    </div>
  );
}
