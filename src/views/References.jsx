import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import http from "../services/http-common";

import { DataContext } from "../App";

// Components
import ListReferences from "../components/ListReferences";
import WidgetCat from "../components/WidgetCat";
import Button from "../components/Button/Button";

const getReferencesBySection = async (sectionId) => {
  // Get sections to spread in context SectionsContext
  return await http
    .get(`references/section/${sectionId}`)
    .then((response) => response.status === 200 && response.data)
    .then(({ references }) => references)
    .catch((error) => {
      // TODO : display the error in a dedicated location
    });
};
const getReferencesByTheme = async (themeId) => {
  // Get sections to spread in context SectionsContext
  return await http
    .get(`references/theme/${themeId}`)
    .then((response) => response.status === 200 && response.data)
    .then(({ references }) => references)
    .catch((error) => {
      // TODO : display the error in a dedicated location
    });
};

// Allows to get categories from each reference and send them in an array. Reduce method makes sure that you don't get any duplication.
// TODO: the dependency array for now has an empty string that I happen to have to shift before returning my new array. It would be best if we didn't need to do that (not urgent)
const findCategoriesInThemeReferences = async (references) => {
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
  return await themeCategories;
};

// COMPONENT
export default function References() {
  const { sectionName, themeName } = useParams();
  const [references, setReferences] = useState([]);
  const { categories, sections, themes } = useContext(DataContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      if (references.length === 0) {
        if (!!sectionName && sections.length > 0 ) {
          setReferences(await getReferencesBySection(sections.find(section =>
            section.name === sectionName).id
          ));
        } else if (!!themeName && themes.length > 0) {
          setReferences(await getReferencesByTheme(themes.find(theme =>
            theme.name === themeName).id
          ));
        }
      }
    })()
  }, [references, sections, sectionName, themes, themeName]);

  return (
    <main className="is-flex is-flex-direction-column borders references is-relative">
      {references.length === 0
        ? <span className="logo-loader">
            <span></span>
            <span></span>
            <span></span>
          </span>
        : <>
            <WidgetCat categories={references.reduce((filtered, reference) => {
              const currentCategory = categories.length > 0 && categories.find(category => category.name === reference.category)
              if (!filtered.find(filter => filter.name === currentCategory.name)) {
                filtered.push(currentCategory)
              }

              return filtered
            }, [])} />
            <h2 className="has-text-centered is-size-3 has-font-weight-bold mt-6 green-grey-text">
              {!!themeName
                ? themeName.toUpperCase().replace(/-/g, " ")
                : sectionName.toUpperCase().replace(/-/g, " ")
              }
            </h2>

            <Button
              className="is-align-self-flex-end send-btn darkblue-bg has-text-white"
              path={themeName ? "/themes" : "/categories"}
              label="Retour"
            />
            {categories.map((category) => (
              references.filter((reference) => reference.category === category.name
              ).length > 0 && (
                <ListReferences
                  key={uuidv4()}
                  title={category.label}
                  name={category.name}
                  references={references.filter((reference) => reference.category === category.name)}
                />
              )
            ))}
          </>
      }
    </main>
  )
}
