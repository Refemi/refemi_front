import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Import components
import FormReference from "./FormReference";
import SelectReference from "./SelectReference";

// Import contexts
const { DashboardContext } = require('../../../App')
/**
 * Display main form to add a reference
 * @returns {JSX.Element}
 */
export default function AddReference() {
  const [currentForm, setCurrentForm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);

  const { setShowNewRef } = useContext(DashboardContext);

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
        onClick={() => setShowNewRef(false)}
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
