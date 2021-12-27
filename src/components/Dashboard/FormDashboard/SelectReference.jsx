import React, { useContext, useEffect, useState } from "react";
// Get API address
import http from "../../../services/http-common";

// Context
import { AllSections } from "../../../App";

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

export default function SelectReference({
  subCategories,
  handleChangeForm,
  setSubCategories,
}) {
  const { categories } = useContext(AllSections);
  const [currentCategory, setCurrentCategory] = useState("");

  const handleChange = (e) => setCurrentCategory(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      if (currentCategory !== "") {
        setSubCategories(await getSection(currentCategory));
      }
    };
    fetchData();
  }, [currentCategory, setSubCategories]);

  return (
    <>
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
        <>
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
        </>
      )}
    </>
  );
}
