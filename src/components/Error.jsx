import React from "react";
import PropTypes from "prop-types";

/// Components
import BlueButton from "./Buttons/BlueButton.jsx";

// JS + JSON
import translationKeys from "../utils/translationKeys.json";
const frenchKeys = translationKeys[0].french;

export default function Error({ errorCode, message }) {
  return (
    <section className="has-text-centered	is-flex is-flex-direction-column is-align-content-center">
      <BlueButton label="Retour" path="back" />
      <h2 className="refemi is-size-1">Erreur {errorCode}</h2>
      <p className="mb-5">{message}</p>
    </section>
  );
}

Error.defaultProps = {
  error: 500,
  message: frenchKeys.errorOccured,
};

Error.propTypes = {
  errocode: PropTypes.number,
  message: PropTypes.string,
};
