import React from "react";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import {
  GiInjustice,
  GiPaintBrush,
  GiPerson,
  GiNewspaper,
  GiBookCover,
} from "react-icons/gi";

// Each form to suggest a reference is different
const switchForm = (category) => {
  switch (category) {
    case "livres-theoriques":
    case "essais":
      return `<p>Titre original (si applicable) :</p>
      <p>Extraits et citations :</p>
      <p>Quatrième de couverture / Résumé :</p>
      <p>Contexte :</p>
      <p>Structure :</p>
      <p>Analyse :</p>
      <p>À propos de l'auteur.ice :</p>
      <p>Sources :</p>
      <p>Pour aller plus loin :</p>`;
    case "romans-autobiographiques":
    case "autobiographies":
    case "romans":
    case "bandes-dessinees":
      return `<p>Titre original (si applicable) :</p>
      <p>Extraits et citations :</p>
      <p>Quatrième de couverture / Résumé :</p>
      <p>Contexte et analyse :</p>
      <p>À propos de l'auteur.ice :</p>
      <p>Sources :</p>
      <p>Pour aller plus loin :</p>`;
    case "films":
    case "courts-metrages":
    case "series":
      return `<p>Titre original (si applicable) :</p>
      <p>Acteur.ices principaux/principales :</p>
      <p>Synopsis :</p>
      <p>Contexte :</p>
      <p>À propos du/des réalisateur.ices :</p>
      <p>Pour aller plus loin :</p>`;
    case "documentaires":
      return `<p>Titre original (si applicable) :</p>
      <p>Épisodes (si applicable) :</p>
      <p>Synopsis :</p>
      <p>Lien / Voir extrait :</p>
      <p>À propos du documentaire :</p>
      <p>À propos du/des réalisateur.ices :</p>
      <p>Pour aller plus loin :</p>`;
    case "podcasts":
      return `
      <p>À propos de(s) l'auteur.ice(s) :</p>
      <p>À propos du podcast: </p>
      <p>Épisodes :</p>
      <p>Lien du podcast : </p>
      <p>Pour aller plus loin :</p>`;
    case "medias":
      return `<p>À propos du média :</p>
      <p>Lien :</p>
      <p>Pour aller plus loin :</p>`;
    case "blogs":
      return `<p>Auteur.ice(s) :</p>
      <p>À propos du blog :</p>
      <p>Lien :</p>
      <p>Pour aller plus loin :</p>`;
    case "reseaux-sociaux":
      return `<p>À propos :</p>
      <p>Lien :</p>
      <p>Pour aller plus loin :</p>`;
    case "articles":
    case "tribunes":
    case "papiers":
      return `<p>À propos :</p>
      <p>Extraits :</p>
      <p>Contexte et analyse :</p>
      <p>À propos de(s) auteur.ice(s) :</p>
      <p>Pour aller plus loin :</p>`;
    case "mouvements":
    case "collectifs":
    case "associations":
      return `<p>Manifeste / Présentation :</p>
      <p>Objectifs :</p>
      <p>Principales actions :</p>
      <p>Pour aller plus loin :</p>`;
    case "lois-effets-france":
      return `<p>À propos :</p>
      <p>Pour aller plus loin :</p>`;
    case "droit-femmes-minorites-monde":
      return `<p>À propos :</p>
      <p>Pays :</p>
      <p>Pour aller plus loin :</p>`;
    case "arts-vivants":
      return `<p>Titre original (si applicable) :</p>
      <p>Synopsis :</p>
      <p>À propos de la pièce :</p>
      <p>À propos de l'artiste :</p>
      <p>Pour aller plus loin :</p>`;
    case "arts-plastiques":
    case "photographie":
    case "peinture":
      return `<p>À propos de l'artiste :</p>
      <p>Oeuvres principales et leurs descriptions / analyses :</p>
      <p>Contexte :</p>
      <p>Pour aller plus loin :</p>`;
    case "ressources-jeunesse":
      return `<p>Extraits et citations :</p>
      <p>Quatrième de couverture / résumé :</p>
      <p>À propos de(s) auteur.ice(s) :</p>
      <p>Pour aller plus loin</p>`;
    case "portraits":
      return `<p>Date de naissance (/ de décès) :</p>
      <p>Nationalité :</p>
      <p>Profession(s) :</p>
      <p>Citations :</p>
      <p>Parcours :</p>
      <p>Bibliographie (si applicable) :</p>
      <p>Actions majeures (si applicable) :</p>
      <p>Concepts majeurs / éléments de pensée (si applicable) :</p>
      <p>Sources :</p>
      <p>Pour aller plus loin :</p>`;
    case "acronymes":
    case "notions":
    case "concepts":
      return `<p>Définition :</p>
      <p>Dates et moments phares (si applicable) :</p>
      <p>Idées principales et textes fondateurs (si applicable) :</p>
      <p>Figures majeures (si applicable) :</p>
      <p>Pour aller plus loin :</p>`;
    default:
      return `<p>Titre original (si applicable) :</p>
      <p>Extraits et citations :</p>
      <p>Contexte :</p>
      <p>Structure :</p>
      <p>Analyse :</p>
      <p>À propos de l'auteur·ice :</p>
      <p>Sources :</p>
      <p>Pour aller plus loin :</p>`;
  }
};

// ********************** //
// Show icon depending on category
const switchIcon = (categoryName) => {
  switch (categoryName) {
    case "Audiovisuel":
      return <AiOutlineFundProjectionScreen size={100} />;
    case "Juridique & Militantisme":
      return <GiInjustice size={100} />;
    case "Art & Jeunessse":
      return <GiPaintBrush size={100} />;
    case "Portraits & Vocabulaire":
      return <GiPerson size={100} />;
    case "Presse & Internet":
      return <GiNewspaper size={100} />;
    case "Lectures":
      return <GiBookCover size={100} />;
    default:
      return null;
  }
};

export { switchForm, switchIcon };
