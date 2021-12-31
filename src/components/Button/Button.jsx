import React from "react";
import { useHistory } from "react-router-dom";

import "../../css/themes.css";

// COMPONENT
export default function Button({ label = "", path = null }) {
  const history = useHistory();

  return (
    <button
      className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end mr-6"
      onClick={path !== null && (() => history.push(path))}
    >
      {label}
    </button>
  );
}
