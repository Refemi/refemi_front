import React from "react";

import BlueButton from "./Buttons/BlueButton.jsx";

export default function Error({
  errorCode = 500,
  message = "Une erreur est survenue",
}) {
  return (
    <section className="has-text-centered	is-flex is-flex-direction-column is-align-content-center">
      <BlueButton label="Retour" path="back" />
      <h2 className="refemi is-size-1">Erreur {errorCode}</h2>
      <p className="mb-5">{message}</p>
    </section>
  );
}
