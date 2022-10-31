import React from "react";
import { useHistory } from "react-router";

// JS + JSON
import { switchButtonIcon } from "../../utils/switchOptions";

export default function HomeButton({ path, label, icon }) {
  const history = useHistory();

  return (
    <button className="cat-btn pointer" onClick={() => history.push(path)}>
      <span className="box box-btn grey-bg-opacity has-text-white is-relative">
        {switchButtonIcon(icon)}
      </span>

      <h4 className="is-uppercase has-text-centered counter-value">{label}</h4>
    </button>
  );
}
