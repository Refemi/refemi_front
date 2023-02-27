import React from "react";

// JS + JSON
import translationKeys from "../../utils/translationKeys.json";

export default function ListReferencesHeader() {
  // TO DO: do a switch on divisions Nom/Titre, Auteur.ice, etc in order to customize them depending on the category (for example for movies, we wouldn't have "auteur.ice" but "réalisateur.ice")

  const frenchKeys = translationKeys[0].french;

  return (
    <article className="description-center borders is-flex is-justify-content-space-between p-5 line white-bg m-3">
      <p className="reflist reflist-div has-text-left">
        {frenchKeys.referenceName}
      </p>
      <p className="reflist reflist-div has-text-centered">
        {frenchKeys.author}
      </p>
      <p className="reflist reflist-div has-text-centered is-hidden-mobile">
        {frenchKeys.country}
      </p>
      <p className="reflist reflist-div has-text-right is-hidden-mobile">
        {frenchKeys.themes}
      </p>
    </article>
  );
}
