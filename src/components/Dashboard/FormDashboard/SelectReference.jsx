import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import http from "../../../services/http-common";

// Context
import { AllSections } from "../../../App";

const getCategories = async (currentSection) => {
  return await http
    .get(`categories/${currentSection}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.subCategories)
}

// TODO: why are we calling here again the API to get to the categories when I think sections and categories are in a context that we could just spread here?

// COMPONENT
export default function SelectReference({ categories, handleChangeForm, setCategories}) {
  const { sections } = useContext(AllSections);
  const [currentSection, setCurrentSection] = useState("");

  // Sets up a category when it's saved from click
  const handleChange = (e) => setCurrentSection(e.target.value);

  useEffect(() => {

    const fetchData = async () => {
      if (currentSection !== "") {
        setCategories(await getCategories(currentSection));
      }
    }

    fetchData();
  }, [currentSection, setCategories]);

  return (
    <form className="is-flex is-flex-direction-column is-align-items-center p-5">
      <label className=" required" htmlFor="categories-select">
        1. Choisir une rubrique
      </label>

      <select
        id="categories-select"
        defaultValue="default"
        onChange={handleChange}
        className="borders select m-3"
      >
        <option value="default" disabled hidden />

        {sections.map((section) => (
          <option key={section.id} value={section.name}>
            {section.label}
          </option>
        ))}
      </select>

      {!!currentSection && categories.length > 0 && (
        <fieldset className="is-flex is-flex-direction-column is-align-items-center">
          <label className="required">Choisir une catégorie</label>
          <select
            id="categories-select"
            defaultValue="default"
            onChange={handleChangeForm}
            className="borders select m-3"
          >
            <option value="default" disabled hidden />

            {categories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.name}>
                {subCategory.label}
              </option>
            ))}
          </select>
        </fieldset>
      )}
    </form>
  );
}

SelectReference.propTypes = {
  categories: PropTypes.array.isRequired,
  handleChangeForm: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired
};
