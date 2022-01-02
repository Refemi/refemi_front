import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
    <main className="mb-6 has-text-center is-flex is-flex-direction-column themes">
      <h2 className="has-text-centered my-6">
        Cliquez sur un thème pour afficher les références associées
      </h2>
      
      <section className="themes-container">
      <Button label="Retour" path="/" />
        <ul className="mt-6 is-flex is-flex-wrap-wrap borders is-justify-content-space-between">
          {themes
            .sort(() => (Math.random() > 0.5 ? 1 : -1))
            .map((theme) => (
              <li
                className="m-1 pointer theme"
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
