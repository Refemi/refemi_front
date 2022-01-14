import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Component import
import Button from "../components/Button/Button";

// Context
import { AllThemes } from "../App";

// COMPONENT
export default function Themes() {
  const { themes } = useContext(AllThemes);
  const history = useHistory();
  const [filteredThemes, setFilteredThemes] = useState([]);
  const [addTheme, setAddTheme] = useState(false);

  const handleSearch = (e) => {
    const themeSearch = e.target.value

    if (themeSearch.length >= 3) {
      const filtered = themes.filter((theme) => theme.name.toLowerCase().includes(themeSearch.toLowerCase()));

      setFilteredThemes(filtered)
      
      if (filtered.length === 0) {
        setAddTheme(true);
      } else if (addTheme) {
        setAddTheme(false);
      }
    } else {

      if (addTheme) {
        setAddTheme(false)
      }

      if (filteredThemes.length !== themes) {
        setFilteredThemes(themes)
      }
    } 
  }

  useEffect(() => {
    // Everytime the page is loaded, goes back to the top of the page
    window.scrollTo(0, 0);
  }, []);


  return (
    <main className="mb-6 has-text-center is-flex is-flex-direction-column themes">
      <h2 className="has-text-centered my-6">
        Cliquez sur un thème pour afficher les références associées
      </h2>

      <section className="themes-container is-flex is-flex-direction-column is-justify-content-center">
        <article className="is-flex is-justify-content-flex-end">
          {addTheme && (
            <button
              className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end mr-4"
              onClick={() => console.log('yo')}
            >
              Suggérer un thème
            </button>
          )}
          <Button label="Retour" path="/" className="column is-four-fifths" />
        </article>
        
        <article className="is-flex is-flex-direction-row is-justify-content-center">
          <fieldset>
            <input
              type="text"
              placeholder="Rechercher un thème"
              onChange={handleSearch}
              className="input is-medium form-input search-input"
            />
          </fieldset>
        </article>

        <article>
          <ul className={`mt-6 is-flex is-flex-wrap-wrap borders is-justify-content-space-${filteredThemes.length > 0 ? 'evenly' : 'between'}`}>
            {(() => filteredThemes.length > 0 ? filteredThemes : themes)()
              .sort(() => (Math.random() > 0.5 ? 1 : -1))
              .map((theme) => (
                <li className="m-1 pointer theme" key={uuidv4()} onClick={() => history.push(`/themes/${theme.name}`)}>
                  <h3>{theme.label}</h3>
                </li>
              ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
