import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

// Context
import { DataContext } from "../App";

// Components
import Loader from "../components/Loader";
import Error from "../components/Error";
import Category from "../components/Categories/Category";

// COMPONENT
export default function Categories() {
  const { sections } = useContext(DataContext);

  return !sections ? (
    <Error errorCode={404} message="Impossible de trouver les sections" />
  ) : (
    <main className="categories">
      {sections.length === 0 ? (
        <Loader />
      ) : (
        <ul className="is-flex is-flex-wrap-wrap is-justify-content-center ">
          {sections.map((category) => (
            <Category
              key={uuidv4()}
              categoryName={category.name}
              categoryLabel={category.label}
              categoryId={category.id}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
