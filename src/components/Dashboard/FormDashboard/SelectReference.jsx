import React, { useContext, useEffect, useState } from "react";
// Get API address
import http from "../../../services/http-common";

// Context
import { AllSections } from "../../../App";

// TODO: why are we calling here again the API to get to the categories when I think sections and categories are in a context that we could just spread here?
const getSection = async (currentCategory) => {
  http
    .get(`categories/${currentCategory}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.subCategories);
};

// COMPONENT
export default function SelectReference({
  subCategories,
  handleChangeForm,
  setSubCategories,
}) {
  const { categories } = useContext(AllSections);
  const [currentCategory, setCurrentCategory] = useState("");

  const handleChange = (e) => setCurrentCategory(e.target.value);

  // Sets up a category when it's saved from click
  useEffect(() => {
    const fetchData = async () => {
      if (currentCategory !== "") {
        setSubCategories(await getSection(currentCategory));
      }
    };
    fetchData();
  }, [currentCategory, setSubCategories]);

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

        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.label}
          </option>
        ))}
      </select>

      {!!currentCategory && subCategories.length > 0 && (
        <fieldset>
          <label className="margin5 required">Choisir une catégorie</label>
          <select
            id="subcategories-select"
            defaultValue="default"
            onChange={handleChangeForm}
            className="borders padding2rem select margin5"
          >
            <option value="default" disabled hidden />

            {subCategories.map((subCategory) => (
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
