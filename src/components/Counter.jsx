import React from "react";

// COMPONENT
export default function Counter({ label = "", value = "" }) {
  return (
    <div className="counter-box box is-flex is-justify-content-center">
      <p className="is-align-self-center is-size-3 counter-value">{value}</p>
      {label ? (
        <p className="is-align-self-center is-size-3 counter-value">{label}</p>
      ) : null}
    </div>
  );
}
