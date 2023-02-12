import React from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// JS
import { switchIcon } from "../../utils/switchOptions";

export default function Category(props) {
  const history = useHistory();

  return (
    <li
      key={uuidv4()}
      className="cat-box is-relative m-6 alternate-bg pointer"
      onClick={() => history.push(`/categories/${props.categoryName}`)}
    >
      <span
        key={uuidv4()}
        className="position-absolute-icon category-icon has-text-white"
      >
        {switchIcon(props.categoryId, 100)}
      </span>
      <p
        key={uuidv4()}
        className="cat-description description-center has-text-centered has-text-weight-bold"
        style={{ position: "absolute" }}
      >
        {props.categoryName.toUpperCase()}
      </p>
    </li>
  );
}
