import React, { useEffect, useState } from "react";

// Components
import FormReference from "./FormReference";
import SelectReference from "./SelectReference";

// COMPONENT
export default function AddReference() {
  const [currentForm, setCurrentForm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => setCurrentForm(e.nativeEvent.target.value);

  // Show needed form
  useEffect(() => {
    currentForm !== "" ? setShowForm(true) : setShowForm(false);
  }, [currentForm]);

  useEffect(() => {
    !showForm && setCurrentForm("");
  }, [showForm, setCurrentForm]);

  return (   
    <>
      <p className="m-3 refemi">Soumettre une nouvelle contribution</p>

      {showForm ? (
        <>
          <article className="is-flex is-flex-direction-row is-align-self-flex-center">
            <button
              className="pointer send-btn darkblue-bg has-text-white mb-5"
              onClick={() => setShowForm(false)}
            >
              Choisir une nouvelle rubrique
            </button>
          </article>
          <article className="is-flex is-flex-direction-column form-content">
            <FormReference category={currentForm} categories={categories} />
          </article>
        </>
      ) : (
        <SelectReference
          handleChangeForm={handleChange}
          setCategories={setCategories}
          categories={categories}
        />
      )}
    </>
  );
}
