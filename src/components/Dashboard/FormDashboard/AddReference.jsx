import React, { useContext, useEffect, useState } from "react";

// Import components
import FormReference from "./FormReference";
import SelectReference from "./SelectReference";

// Import contexts
/**
 * Display main form to add a reference
 * @returns {JSX.Element}
 */
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

  console.log('categories:', categories, currentForm)

  return (
    <section className="dashboard-content borders is-flex is-flex-direction-column is-align-items-center mt-6">
      <button
        className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
        onClick={() => console.log('retour')}
      >
        Retour à mes contributions
      </button>

      <p className="m-3 refemi">Soumettre une nouvelle contribution</p>

      {showForm ? (
        <article className="is-flex is-flex-direction-column form-content">
          <button
            onClick={() => setShowForm(false)}
            className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
          >
            Retour aux rubriques
          </button>
          <FormReference category={currentForm} categories={categories} />
        </article>
      ) : (
        <SelectReference
          handleChangeForm={handleChange}
          setCategories={setCategories}
          categories={categories}
        />
      )}
    </section>
  );
}
