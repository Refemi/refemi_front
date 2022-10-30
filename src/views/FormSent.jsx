import React from "react";
import BlueButton from "../components/Buttons/BlueButton";

// Context
import HeaderDashboard from "../components/Dashboard/ContentDashboard/HeaderDashboard";

// JS + JSON
import translationKeys from "../utils/translationKeys.json";

//Displays the form for adding / modifying references
export default function FormSent() {
  const frenchKeys = translationKeys[0].french;
  return (
    <main className="is-flex is-justify-content-center is-flex-direction-column dashboard">
      <HeaderDashboard />
      <section className="p-6 is-flex is-justify-content-center is-flex-direction-column ">
        <BlueButton
          className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
          path={"dashboard"}
          label={"Retour à mes contributions"}
        />

        <p>{frenchKeys.referenceHasBeenSent}</p>
        <p>{frenchKeys.thanksForReference}</p>
      </section>
    </main>
  );
}
