import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "../css/themes.css";

// Component import
import Button from "../components/Button/Button";

// Context
import { AllThemes } from "../App";

// COMPONENT
export default function Themes() {
  const { themes } = useContext(AllThemes);
  const history = useHistory();

  useEffect(() => {
    // Everytime the page is loaded, goes back to the top of the page
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="margin-bottom20 text-center flex is-flex-direction-column">
      <h2 className="mb-2">
        Cliquez sur un thème pour afficher les références associées
      </h2>
      <Button label="Retour" path="/" />
      <section className="flex is-justify-content-center">
        <ul className="flex is-flex-wrap-wrap borders is-justify-content-space-between square m-6">
          {themes
            .sort(() => (Math.random() > 0.5 ? 1 : -1))
            .map((theme) => (
              <li
                className="margin5 pointer theme"
                key={theme.id}
                onClick={() => history.push(`/themes/${theme.name}`)}
              >
                <h3>{theme.label}</h3>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
