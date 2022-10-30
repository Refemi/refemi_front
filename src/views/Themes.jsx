import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Component import
import BlueButton from "../components/Buttons/BlueButton";
import Loader from "../components/Loader";
import Error from "../components/Error";

// Context
import { DataContext } from "../App";

// JS + JSON
import translationKeys from "../utils/translationKeys.json";

// COMPONENT
export default function Themes() {
  const { themes } = useContext(DataContext);
  const history = useHistory();

  const frenchKeys = translationKeys[0].french;

  return !themes ? (
    <Error errorCode={404} message="Impossible de trouver les thèmes" />
  ) : (
    <main className="mb-6 has-text-center is-flex is-flex-direction-column themes">
      {themes.length === 0 ? (
        <Loader />
      ) : (
        <>
          <h2 className="has-text-centered my-6">{frenchKeys.clickOnTheme}</h2>

          <section className="themes-container is-flex is-flex-direction-column">
            <BlueButton label="Retour" path="back" />
            <ul className="mt-6 is-flex is-flex-wrap-wrap borders is-justify-content-space-between">
              {themes
                .sort(() => (Math.random() > 0.5 ? 1 : -1))
                .map((theme) => (
                  <li
                    className="m-1 pointer theme"
                    key={uuidv4()}
                    onClick={() => {
                      history.push(`/themes/${theme.name}`);
                    }}
                  >
                    <h3>{theme.label}</h3>
                  </li>
                ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
