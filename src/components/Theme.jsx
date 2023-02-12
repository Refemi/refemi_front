import React from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Theme(props) {
  const history = useHistory();

  return (
    <span className="reflist-div scrollbar is-hidden-mobile is-flex is-flex-wrap-wrap is-justify-content-end">
      {props.themes.map((theme) => (
        <h4
          className="ml-4 has-text-weight-bold pointer darkblue-text clickable"
          key={uuidv4()}
          onClick={() => {
            clearReferences();
            history.push(
              `/themes/${theme
                .toLowerCase()
                .replace(/\s+/g, "-")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}`
            );
          }}
        >
          {theme}
        </h4>
      ))}
    </span>
  );
}
