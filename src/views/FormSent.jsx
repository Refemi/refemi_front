import React from "react";
import Button from "../components/Button/Button";

// Context
import HeaderDashboard from "../components/Dashboard/ContentDashboard/HeaderDashboard";

//Displays the form for adding / modifying references
export default function FormSent() {
  return (
    <main className="is-flex is-justify-content-center is-flex-direction-column dashboard">
      <HeaderDashboard />
      <section className="p-6 is-flex is-justify-content-center is-flex-direction-column ">
        <Button
          className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
          onClick={"dashboard"}
        >
          Retour à mes contributions
        </Button>
        <p>
          Votre contribution a bien été envoyée et sera examinée par un.e
          modérateur.ice. Vous serez informé.e par email dès sa validation !
        </p>
        <p>Un grand merci pour votre participation !</p>
      </section>
    </main>
  );
}
