import React from "react";
import { useHistory } from "react-router-dom";

import "../../css/themes.css";

export default function Button({ label = "", path = null }) {
  const history = useHistory();

  return (
    <button
      className="margin-top10 margin-end10 pointer send-btn darkblue-bg text-white align-self-right"
      onClick={path !== null && (() => history.push(path))}
    >
      {label}
    </button>
  );
}
