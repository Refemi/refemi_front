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
    <section className="dashboard dashboard-content borders flex is-flex-direction-column is-align-items-center">
      <button
        className="margin-end10 pointer send-btn darkblue-bg text-white is-align-self-flex-end"
        onClick={() => changeIsClicked()}
      >
        Retour à mes contributions
      </button>

      <p className="margin5 refemi">Soumettre une nouvelle contribution</p>

      {showForm ? (
        <article className="flex is-flex-direction-column width80">
          <button
            onClick={() => setShowForm(false)}
            className="margin-end10 pointer send-btn darkblue-bg text-white is-align-self-flex-end"
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
