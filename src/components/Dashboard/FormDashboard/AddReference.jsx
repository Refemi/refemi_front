import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Components
import FormReference from "./FormReference";
import SelectReference from "./SelectReference";

// COMPONENT
export default function AddReference({ changeIsClicked }) {
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
    <section className="dashboard-content borders is-flex is-flex-direction-column is-align-items-center mt-6">
      <button
        className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
        onClick={() => changeIsClicked()}
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

AddReference.propTypes = {
  changeIsClicked: PropTypes.func.isRequired,
};
