import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import http from "../services/http-common";

import Error from "../components/Error";

import { DataContext } from "../App";

// Components
import ListReferences from "../components/ListReferences";
import WidgetCat from "../components/WidgetCat";
import Button from "../components/Button/Button";
import Loader from "../components/Loader";

const getReferencesBySection = async (sectionId) => {
  // Get sections to spread in context SectionsContext
  return await http()
    .get(`references/section/${sectionId}`)
    .then((response) => response.status === 200 && response.data)
    .then(({ references }) =>
      references.sort(() => (Math.random() > 0.5 ? 1 : -1))
    )
    .catch(() => {
      return false;
    });
};
const getReferencesByTheme = async (themeId) => {
  // Get sections to spread in context SectionsContext
  return await http()
    .get(`references/theme/${themeId}`)
    .then((response) => response.status === 200 && response.data)
    .then(({ references }) => references)
    .catch(() => {
      return false;
    });
};

// Allows to get categories from each reference and send them in an array. Reduce method makes sure that you don't get any duplication.
// TODO: the dependency array for now has an empty string that I happen to have to shift before returning my new array. It would be best if we didn't need to do that (not urgent)
const findCategoriesInThemeReferences = (references) => {
  const themeCategories = references.reduce(
    (categories, reference) => {
      if (!categories.includes(reference.category)) {
        categories.push(reference.category);
      }
      return categories;
    },
    [""]
  );
  themeCategories.shift();
  return themeCategories;
};

// COMPONENT
export default function References() {
  const { sectionName, themeName } = useParams();
  const [references, setReferences] = useState([]);
  const { categories, sections, themes } = useContext(DataContext);
  const [themeCategories, setThemeCategories] = useState([]);

  const getReferences = async () => {
    if (references.length === 0) {
      try {
        if (!!sectionName && sections.length > 0) {
          setReferences(
            await getReferencesBySection(
              sections.find((section) => section.name === sectionName).id
            )
          );
        } else if (!!themeName && themes.length > 0) {
          setReferences(
            await getReferencesByTheme(
              themes.find((theme) => theme.name === themeName).id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const errorMessage = () => {
    if (!!sectionName) {
      const currentSection = sections.filter(
        (section) => sectionName === section.name
      )[0];

      if (currentSection === undefined) {
        return `La section recherchée (${sectionName}) est introuvable`;
      } else {
        return `Aucune référence dans la section ${currentSection.label}`;
      }
    } else if (!!themeName) {
      const currentTheme = themes.filter(
        (theme) => themeName === theme.name
      )[0];

      if (currentTheme === undefined) {
        return `Le theme recherché (${themeName}) est introuvable`;
      } else {
        return `Aucune référence dans le thème ${currentTheme.label}`;
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getReferences();
  }, [references, sections, sectionName, themes, themeName]);

  useEffect(() => {
    if (references) {
      setThemeCategories(findCategoriesInThemeReferences(references));
    }
  }, [references]);

  return (
    <main className="is-flex is-flex-direction-column borders references is-relative">
      {!references ? (
        <Error errorCode={404} message={errorMessage()} />
      ) : references.length === 0 ? (
        <Loader />
      ) : (
        <>
          <WidgetCat categories={themeCategories} />
          <h2 className="has-text-centered is-size-3 has-font-weight-bold mt-6 green-grey-text">
            {!!themeName
              ? themeName.toUpperCase().replace(/-/g, " ")
              : sectionName.toUpperCase().replace(/-/g, " ")}
          </h2>

          <Button
            className="is-align-self-flex-end send-btn darkblue-bg has-text-white"
            path={themeName ? "/themes" : "/categories"}
            label="Retour"
          />
          {categories.map(
            (category) =>
              references.filter(
                (reference) => reference.category === category.name
              ).length > 0 && (
                <ListReferences
                  key={uuidv4()}
                  title={category.label}
                  name={category.name}
                  references={references.filter(
                    (reference) => reference.category === category.name
                  )}
                  clearReferences={() => { setReferences([])}}
                />
              )
          )}
        </>
      )}
    </main>
  );
}
