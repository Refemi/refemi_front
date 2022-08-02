import React from "react";
import { useHistory } from "react-router";

export default function LoggedOut() {
  const history = useHistory();

  let handleClick = (e) => {
    e.preventDefault();
    history.push("/auth/signup");
  };

  return (
    <main className="auth is-flex is-flex-direction-column is-align-items-center">
      <h2 className="mt-6 has-text-weight-bold has-text-centered mx-3">
        Vous n'êtes plus connecté.e. Merci de vous identifier à nouveau pour
        accéder à votre tableau de bord.
      </h2>
      <button
        className="darkblue-bg send-btn has-text-white pointer mt-6"
        onClick={(e) => handleClick(e)}
      >
        Se connecter
      </button>
    </main>
  );
}
