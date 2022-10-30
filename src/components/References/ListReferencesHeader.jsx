import React from "react";

export default function ListReferencesHeader() {
  return (
    <article className="description-center borders is-flex is-justify-content-space-between p-5 line white-bg m-3">
      <p className="reflist reflist-div has-text-left">Nom / Titre</p>
      <p className="reflist reflist-div has-text-centered">Auteur.ice</p>
      <p className="reflist reflist-div has-text-centered is-hidden-mobile">
        Pays
      </p>
      <p className="reflist reflist-div has-text-right is-hidden-mobile">
        Thèmes
      </p>
    </article>
  );
}
