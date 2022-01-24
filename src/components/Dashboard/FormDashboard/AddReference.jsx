import React, { createContext, useContext, useEffect, useState } from "react";

// Import components
import FormReference from "./FormReference";
import SelectReference from "./SelectReference";

// Import contexts
import { DashboardContext } from "../../../views/Dashboard";

// Create contexts
export const FormContext = createContext()
/**
 * Display main form to add a reference
 * @returns {JSX.Element}
 */
export default function AddReference() {
  const [currentForm, setCurrentForm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentSection, setCurrentSection] = useState("");
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
        onClick={() => setShowNewRef()}
      >
        Retour à mes contributions
      </button>

      <p className="m-3 refemi">Soumettre une nouvelle contribution</p>

      {showForm
        ? (
          <article className="is-flex is-flex-direction-column form-content">
            <button
              onClick={() => setShowForm(false)}
              className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-start"
            >
              Retour aux rubriques
            </button>
            <FormReference category={currentForm} categories={categories.filter(category => category.section_id === currentSection)} />
          </article>
        ) : (
          <SelectReference
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            handleChangeForm={handleChange}
          />
        )
      }
    </section>
  );
}
