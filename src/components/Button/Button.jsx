import React from "react";
import { useHistory } from "react-router-dom";

import "../../css/themes.css";

// COMPONENT
export default function Button({ label = "", path = null }) {
  const history = useHistory();

  return (
    <button
      className="margin-top10 margin-end10 pointer send-btn darkblue-bg text-white is-align-self-flex-end"
      onClick={path !== null && (() => history.push(path))}
    >
      {label}
    </button>
  );
}
