import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// Import components
import SelectReference from "./SelectReference";
import HeaderDashboard from "../ContentDashboard/HeaderDashboard";

// Create contexts
export const FormContext = createContext()
/**
 * Display main form to add a reference
 * @returns {JSX.Element}
 */
export default function AddReference() {
  // const { setShowNewRef } = useContext(DashboardContext);
  const [currentForm, setCurrentForm] = useState("");
  const [currentSection, setCurrentSection] = useState("");
    const history = useHistory();

  const handleChange = (e) => setCurrentForm(parseInt(e.nativeEvent.target.value));

      // sessionStorage used to sotre SelectReference
     sessionStorage.setItem("SelectReference", JSON.stringify(currentForm));

  return (
      <main className="is-flex is-justify-content-center is-flex-direction-column dashboard">
          <HeaderDashboard />
          <section className="dashboard-content borders is-flex is-flex-direction-column is-align-items-center mt-6">
              <button
                className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
                onClick={() => history.goBack()}
              >
                Retour à mes contributions
              </button>

              <p className="m-3 refemi">Soumettre une nouvelle contribution</p>

              <SelectReference
                  currentSection={currentSection}
                  setCurrentSection={setCurrentSection}
                  handleChangeForm={handleChange}
                />
              {!currentForm 
                  ?(""):(<button
                        className="pointer send-btn darkblue-bg has-text-white"
                          onClick={() => history.push("/addReference/formReference")}
                        >
                          Retour aux rubriques
                  </button>)
              }

        </section>
    </main>
  );
}
