import React from "react";
import {
  AiOutlineFundProjectionScreen,
  AiFillPlusCircle,
} from "react-icons/ai";
import {
  GiInjustice,
  GiPaintBrush,
  GiPerson,
  GiNewspaper,
  GiBookCover,
} from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { BsList } from "react-icons/bs";

import TheoreticalBooksAndEssays from "../components/Dashboard/FormDashboard/Forms/TheoreticalBooksAndEssays";
import OtherBooks from "../components/Dashboard/FormDashboard/Forms/OtherBooks";
import MoviesAndShows from "../components/Dashboard/FormDashboard/Forms/MoviesAndShows";
import Documentaries from "../components/Dashboard/FormDashboard/Forms/Documentaries";
import Podcasts from "../components/Dashboard/FormDashboard/Forms/Podcasts";
import SocialNetworks from "../components/Dashboard/FormDashboard/Forms/SocialNetworks";

// Each form to suggest a reference is different
const switchForm = (category) => {
  switch (category) {
    case "livres-theoriques":
    case "essais":
      return <TheoreticalBooksAndEssays />;
    case "roman-autobiographique":
    case "autobiographie":
    case "roman":
    case "bande-dessinee":
      return <OtherBooks />;
    case "film-court-metrage":
    case "serie":
      return <MoviesAndShows />;
    case "documentaires":
      return <Documentaries />;
    case "podcasts":
      return <Podcasts />;
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
      return <SocialNetworks />;
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
const switchIcon = (sectionId) => {
  switch (sectionId) {
    case "2":
      return <AiOutlineFundProjectionScreen size={100} />;
    case "3":
      return <GiInjustice size={100} />;
    case "5":
      return <GiPaintBrush size={100} />;
    case "6":
      return <GiPerson size={100} />;
    case "4":
      return <GiNewspaper size={100} />;
    case "1":
      return <GiBookCover size={100} />;
    default:
      return null;
  }
};

const switchButtonIcon = (option) => {
  switch (option) {
    case "categories":
      return <BiCategoryAlt className="position-absolute-icon" size={100} />;
    case "themes":
      return <BsList className="position-absolute-icon" size={100} />;
    case "contribute":
      return <AiFillPlusCircle className="position-absolute-icon" size={100} />;
    default:
      break;
  }
};

const switchNavigationTo = (path, navigateTo, target) => {
  switch (path) {
    case "categories":
      return navigateTo("/categories");
    case "themes":
      return navigateTo("/themes");
    case "themeName":
      return navigateTo(`/themes/${target}`);
    case "signIn":
      return navigateTo("/auth/signin");
    case "signOut":
      return navigateTo("/auth/signout");
    case "dashboard":
      return navigateTo("/dashboard");
    case "contact":
      return navigateTo("/contact");
    case "search":
      return navigateTo("/search");
    case "formSent":
      return navigateTo("/addReference/formReference/formSent");
    case "addReference":
      return navigateTo("/addReference");
  }
};

export { switchForm, switchIcon, switchButtonIcon, switchNavigationTo };
