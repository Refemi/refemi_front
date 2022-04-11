import React from 'react';

import Button from './Button/Button.jsx';

/**
 * @description Displays an error page depending on the arguments entered
 * @param {Object} props
 * @param {number} props.errorCode - The error code
 * @param {string} props.message - The error message
 * @return {JSX.Element}
 */
export default function Error({
  errorCode = 500,
  message = 'Une erreur est survenue',
}) {
  return (
    <section className='has-text-centered	is-flex is-flex-direction-column is-align-content-center'>
      <Button label='Retour' path='back' />
      <h2 className='refemi is-size-1'>Erreur {errorCode}</h2>
      <p className='mb-5'>{message}</p>
    </section>
  );
}
