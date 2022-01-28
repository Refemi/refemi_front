import React from "react";

import Button from "./Button";

/**
 * @description Displays an error page depending on the arguments entered
 * @param {Object} props
 * @param {number} props.errorCode - The error code
 * @param {string} props.message - The error message
 * @return {JSX.Element}
 */
export default function Error({ errorCode = 500, message = "Une erreur est survenue" }) {

  return (
    <main style={{ marginTop: "20rem", textAlign:"center" }}>
      <h3 className="refemi is-size-1">Erreur {errorCode}</h3>
      <p className="mb-5">{message}</p>
      <Button label="Retour" path="back" />
    </main>
  );
}