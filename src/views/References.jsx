import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import http from "../services/http-common";

// Components
import ListReferences from "../components/ListReferences";
import WidgetCat from "../components/WidgetCat";

import "../css/categories.css";
import "../css/references.css";

// Context
import { AllSections } from "../App";

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

export default function References() {
  const { categoryName, themeName } = useParams();
  const sections = useContext(AllSections);
  const history = useHistory();

  const [references, setReferences] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (categoryName !== undefined) {
        setCategories(await getCategories(categoryName));
        setReferences(await getReferencesByCategory(categoryName));
      } else if (themeName !== undefined) {
        console.log("faire les fonctions pour récupérer les themes");
      }
    };
    fetchData();
  }, [categoryName, setCategories, setReferences]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{ width: "80%", margin: "20vh auto" }}
      className="flex flex-column borders padding5 position-relative"
    >
      {categoryName && <WidgetCat subCategories={(categories, sections)} />}

      <button
        className="align-self-right send-btn darkblue-bg text-white"
        onClick={() => history.goBack()}
      >
        Retour
      </button>

      {categories.map(
        (category) =>
          references.filter((reference) => reference.category === category.name)
            .length > 0 && (
            <ListReferences
              key={category.id}
              title={category.label}
              name={category.name}
              references={references.filter(
                (reference) => reference.category === category.name
              )}
            />
          )
      )}
    </div>
  );
}
