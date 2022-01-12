import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../services/http-common";
import { v4 as uuidv4 } from "uuid";

// Components
import ListReferences from "../components/ListReferences";
import WidgetCat from "../components/WidgetCat";
import Button from "../components/Button/Button";

// Gets categories (correspond to subcategories in DB at the moment)
const getCategories = async (categoryName) => {
  return await http
    .get(`categories/${categoryName}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.subCategories); // TODO :  update when backend gives categories instead of subcategories
};

// Gets the references sorted by category
const getReferencesByCategory = async (categoryName) => {
  return await http
    .get(`references/category/${categoryName}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.references.sort(() => (Math.random() > 0.5 ? 1 : -1)));
};

// Gets the references sorted by theme
const getReferencesByThemes = async (themeName) => {
  return await http
    .get(`references/theme/${themeName}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.references.sort(() => (Math.random() > 0.5 ? 1 : -1)));
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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get references for Categories page OR Themes page, waiting to have the clicked category/theme before showing data
  useEffect(() => {
    const fetchData = async () => {
      if (sectionName !== undefined) {
        setCategories(await getCategories(sectionName));
        setReferences(await getReferencesByCategory(sectionName));
      } else if (themeName !== undefined) {
        setReferences(await getReferencesByThemes(themeName));
      }
    };
    fetchData();
  }, [sectionName, themeName]);

  // Get the references for Themes page only once the references are ready. Otherwise, it doesn't render the data when the page loads.
  useEffect(() => {
    if (themeName !== undefined) {
      const fetchData = async () => {
        setCategories(await findCategoriesInThemeReferences(references));
      };
      fetchData();
    }
  }, [references, themeName]);


  return (
    <main className="is-flex is-flex-direction-column borders references is-relative">
      <WidgetCat categories={categories} />
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
        ? categories.map((category) =>
          references.filter((reference) => reference.category === category.name).length > 0 && (
            <ListReferences
              key={uuidv4()}
              title={category.label}
              name={category.name}
              references={references.filter((reference) => reference.category === category.name)}
            />
          )
        )
        : categories.map(
            (category) =>
              references.filter((reference) => reference.category === category)
                .length >= 0 && (
                <ListReferences
                  key={uuidv4()}
                  title={category}
                  name={category}
                  references={references.filter(
                    (reference) => reference.category === category
                  )}
                />
              )
          )}
    </main>
  );
}
