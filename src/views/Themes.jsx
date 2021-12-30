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
    <main className="margin-bottom20 text-center flex flex-column">
      <h2 className="margin-bottom5">
        Cliquez sur un thème pour afficher les références associées
      </h2>
      <Button label="Retour" path="/" />
      <section className="flex justify-center">
        <ul className="flex flex-wrap borders justify-between square margin10">
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
