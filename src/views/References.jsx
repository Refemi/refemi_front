import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import http from "../services/http-common";
import { v4 as uuidv4 } from "uuid";

import { DataContext } from "../App";

// Components
import ListReferences from "../components/ListReferences";
import WidgetCat from "../components/WidgetCat";
import Button from "../components/Button/Button";


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

  const { categories, references } = useContext(DataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="is-flex is-flex-direction-column borders references is-relative">
      <WidgetCat
        categories={categories.reduce((filtered, category) => {
          category.name === sectionName && filtered.push(category.name)
          return filtered
        }, [])}
      />
      <h2 className="has-text-centered is-size-3 has-font-weight-bold mt-6 green-grey-text">
        {themeName
          ? themeName.toUpperCase().replace(/-/g, " ")
          : sectionName.toUpperCase().replace(/-/g, " ")}
      </h2>

      <Button
        className="is-align-self-flex-end send-btn darkblue-bg has-text-white"
        path={themeName ? "/themes" : "/categories"}
        label="Retour"
      />

      {!themeName
        ? categories.map((category) => {
          return references.filter((reference) => 
            reference.category === category.id && reference.category
          ).length > 0 && (
            <ListReferences
              key={uuidv4()}
              title={category.label}
              name={category.name}
              references={references.filter((reference) => reference.category === category.id)}
            />
          )
        }) : categories.map((category) => {
          return references.filter((reference) => reference.category === category)
            .length >= 0 && (
              <ListReferences
                key={uuidv4()}
                title={category}
                name={category}
                references={references.filter((reference) => reference.category === category)}
              />
            ) 
        })
      }
    </main>
  );
}
