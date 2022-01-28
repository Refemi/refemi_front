import React from "react";

import Button from "./Button";

/**
 * 
 * @param {number} errorCode
 * @returns 
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