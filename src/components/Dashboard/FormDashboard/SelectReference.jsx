import React, { useContext, useEffect, useState } from "react";
// Get API address
import http from "../../../services/http-common";

// Context
import { AllSections } from "../../../App";

// TODO: why are we calling here again the API to get to the categories when I think sections and categories are in a context that we could just spread here?
const getSection = async (currentSection) => {};

// COMPONENT
export default function SelectReference({
  categories,
  handleChangeForm,
  setCategories,
}) {
  const { sections } = useContext(AllSections);
  const [currentSection, setCurrentSection] = useState("");

  const handleChange = (e) => setCurrentSection(e.target.value);

  // Sets up a category when it's saved from click
  useEffect(() => {
    if (currentSection !== "") {
      http
        .get(`categories/${currentSection}`)
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .then((data) => setCategories(data.subCategories));
    }
  }, [currentSection, setCategories]);

  return (
    <form>
      <label className="margin5 required" htmlFor="categories-select">
        Choisir une rubrique
      </label>

      <select
        id="categories-select"
        defaultValue="default"
        onChange={handleChange}
        className="borders padding2rem select margin5"
      >
        <option value="default" disabled hidden />

        {sections.map((section) => (
          <option key={section.id} value={section.name}>
            {section.label}
          </option>
        ))}
      </select>

      {!!currentSection && categories.length > 0 && (
        <fieldset>
          <label className="margin5 required">Choisir une catégorie</label>
          <select
            id="categories-select"
            defaultValue="default"
            onChange={handleChangeForm}
            className="borders padding2rem select margin5"
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
