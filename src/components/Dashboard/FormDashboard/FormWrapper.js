import React, { useContext, useEffect, useState } from "react";

// JS
import { switchForm } from "../../../utils/switchOptions";

// Context
import { DataContext } from "../../../App";

//Displays the form for adding / modifying references
export default function FormWrapper() {
  const { categories } = useContext(DataContext);
  const [currentCategory, setCurrentCategory] = useState({});

  //  sessionStorage used to get category id from AddReference component
  const categoryId = JSON.parse(sessionStorage.getItem("SelectReference"));

  useEffect(() => {
    setCurrentCategory(
      categories.find(({ id }) => parseInt(id) === parseInt(categoryId))
    );
  }, [categories, categoryId]);

  return (
    <section className="is-flex is-justify-content-center is-flex-direction-column dashboard">
      {currentCategory ? switchForm(currentCategory.label) : null}
    </section>
  );
}
