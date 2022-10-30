import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// Import components
import SelectReference from "./SelectReference";
import HeaderDashboard from "../ContentDashboard/HeaderDashboard";
import BlueButton from "../../Buttons/BlueButton";

export default function AddReference() {
  const [currentForm, setCurrentForm] = useState("");
  const [currentSection, setCurrentSection] = useState("");

  // we save the section selection
  const handleChange = (e) =>
    setCurrentForm(parseInt(e.nativeEvent.target.value));

  // sessionStorage used to store selected section
  sessionStorage.setItem("SelectReference", JSON.stringify(currentForm));

  return (
    <main className="is-flex is-justify-content-center is-flex-direction-column dashboard">
      <HeaderDashboard />
      <section className="dashboard-content is-flex is-flex-direction-column is-align-items-center">
        <BlueButton
          className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
          path={"back"}
          label="Retour à mes contributions"
        />

        <p className="m-3 refemi">Soumettre une nouvelle contribution</p>

        <SelectReference
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          handleChangeForm={handleChange}
        />
        {currentForm && (
          <BlueButton
            className="pointer send-btn darkblue-bg has-text-white"
            path="addReference"
            label="Valider"
          />
        )}
      </section>
    </main>
  );
}
