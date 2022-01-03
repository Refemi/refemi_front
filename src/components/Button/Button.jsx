import React from "react";
import { useHistory } from "react-router-dom";

// COMPONENT
export default function Button({ label = "", path = null }) {
  const history = useHistory();

  return (
    <button
      className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end mr-4"
      onClick={path !== null && (() => history.push(path))}
    >
      {label}
    </button>
  );
}
