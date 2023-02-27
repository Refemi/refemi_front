import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

// COMPONENT
export default function BlueButton({ label, path, spacing }) {
  const history = useHistory();

  const navigateTo = (path) => {
    switch (path) {
      case "back":
        history.goBack();
        break;
      case "addReference":
        history.push("/addReference/formReference");
        break;
      case "home":
        history.push("/");
        break;
      case "categories":
        history.push("/categories");
        break;
      case "themes":
        history.push("/themes");
        break;
      case "dashboard":
        history.push("/dashboard");
      default:
        history.push(path);
    }
  };

  return (
    <button
      className={`${spacing} pointer send-btn darkblue-bg has-text-white is-align-self-flex-end mr-4`}
      onClick={() => navigateTo(path)}
    >
      {label}
    </button>
  );
}

BlueButton.propTypes = {
  label: PropTypes.string,
  path: PropTypes.string,
};
