import React from "react";
import { useHistory } from "react-router";

// JS + JSON
import translationKeys from "../utils/translationKeys.json";
import { switchNavigationTo } from "../utils/switchOptions";

export default function LoggedOut() {
  const frenchKeys = translationKeys[0].french;
  const history = useHistory();

  const navigateTo = (e, path) => {
    e.preventDefault();
    history.push(path);
  };

  return (
    <main className="auth is-flex is-flex-direction-column is-align-items-center">
      <h2 className="mt-6 has-text-weight-bold has-text-centered mx-3">
        {frenchKeys.signInAgain}
      </h2>
      <button
        className="darkblue-bg send-btn has-text-white pointer mt-6"
        onClick={(e) => switchNavigationTo("signIn", navigateTo(e))}
      >
        {frenchKeys.signIn}
      </button>
    </main>
  );
}
