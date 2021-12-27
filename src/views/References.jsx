import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../services/http-common";
import { v4 as uuidv4 } from "uuid";

// Components
import ListReferences from "../components/ListReferences";
import WidgetCat from "../components/WidgetCat";
import Button from "../components/Button/Button";

import "../css/categories.css";
import "../css/references.css";

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
const getReferencesByCategory = async (categoryName) => {
  return await http
    .get(`references/category/${categoryName}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.references);
};

const getReferencesByThemes = async (themeName) => {
  return await http
    .get(`references/theme/${themeName}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.references);
};

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

export default function References() {
  const { categoryName, themeName } = useParams();

  const [references, setReferences] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      if (categoryName !== undefined) {
        setCategories(await getCategories(categoryName));
        setReferences(await getReferencesByCategory(categoryName));
      } else if (themeName !== undefined) {
        setReferences(await getReferencesByThemes(themeName));
      }
    };
    fetchData()
  }, [categoryName, themeName]);
  
  useEffect(() => {
    const fetchData = async () => {
      setCategories(await findCategoriesInThemeReferences(references)
      );
    }
    fetchData()
  }, [references])

  return (
    <div
      style={{ width: "80%", margin: "20vh auto" }}
      className="flex flex-column borders padding5 position-relative"
    >
      <WidgetCat categories={categories} />

      <Button
        className="align-self-right send-btn darkblue-bg text-white"
        path="/themes"
        label="Retour"
      />

      <h1 id={uuidv4()}>
        {themeName.charAt(0).toUpperCase() +
          themeName.slice(1).replace(/-/g, " ")}
      </h1>

      {categories && !themeName
        ? categories.map(
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
                  references={references}
                />
              )
          )}
    </div>
  );
}
