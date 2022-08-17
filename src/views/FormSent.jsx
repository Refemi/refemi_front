import React from "react";

// Context
import HeaderDashboard from "../components/Dashboard/ContentDashboard/HeaderDashboard";

//Displays the form for adding / modifying references
export default function FormSent() {
  return (
    <main className="has-text-justified">
      <HeaderDashboard />
      <p>
        Votre contribution a bien été envoyée et sera examinée par un.e
        modérateur.ice. Vous serez informé.e par email dès sa validation !
      </p>
      <p>Un grand merci pour votre participation !</p>
    </main>
  );
}
