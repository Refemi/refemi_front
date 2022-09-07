import React from "react";
import { useHistory } from "react-router-dom";

// COMPONENT
export default function Button({ label = "", path = null }) {
  const history = useHistory();

  return (
    <button
      className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end mr-4"
      onClick={
        path !== null &&
        (() => {
          switch (path) {
            case "back":
              history.goBack();
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
        })
      }
    >
      {label}
    </button>
  );
}
