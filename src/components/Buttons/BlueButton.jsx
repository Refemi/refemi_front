import React from "react";
import { useHistory } from "react-router-dom";

// COMPONENT
export default function BlueButton({ label, path }) {
  const history = useHistory();

  const navigationPath = (path) => {
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
      className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end mr-4"
      onClick={() => navigationPath(path)}
    >
      {label}
    </button>
  );
}
