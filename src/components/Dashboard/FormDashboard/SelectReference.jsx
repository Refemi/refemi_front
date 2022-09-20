import React, { useContext } from "react";
import PropTypes from "prop-types";

// Context
import { DataContext } from "../../../App";

// SelectReference component
export default function SelectReference({
  currentSection,
  setCurrentSection,
  handleChangeForm,
}) {
  const { sections, categories } = useContext(DataContext);

  const categoriesOptions = categories.filter((category) => {
    return category.section_id === parseInt(currentSection);
  });

  return (
    <form className="is-flex is-flex-direction-column is-align-items-center">
      <fieldset className="dashboard-fieldset is-flex is-flex-direction-column">
        <label className=" required" htmlFor="categories-select-section">
          1. Choisir une rubrique
        </label>

        <select
          id="categories-select-section"
          defaultValue="default"
          onChange={(event) => setCurrentSection(event.target.value)}
          className="borders select m-3"
        >
          <option value="default" disabled hidden />

          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </fieldset>

      {!!currentSection && categories.length > 0 && (
        <fieldset className="dashboard-fieldset is-flex is-flex-direction-column">
          <label className="required" for="categories-select-category">
            2. Choisir une catégorie
          </label>
          <select
            id="categories-select-category"
            defaultValue="default"
            onChange={handleChangeForm}
            className="borders select m-3"
          >
            <option value="default" disabled hidden />

            {categoriesOptions.map((category) => (
              <option
                key={category.id}
                value={category.id}
                for="categories-select-category"
              >
                {category.label}
              </option>
            ))}
          </select>
        </fieldset>
      )}
    </form>
  );
}

SelectReference.propTypes = {
  currentSection: PropTypes.string.isRequired,
  setCurrentSection: PropTypes.func.isRequired,
  handleChangeForm: PropTypes.func.isRequired,
};
