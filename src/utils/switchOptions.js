const switchForm = category => {
  switch (category) {
    case 'Livres théoriques':
    case 'Essais':
      return `<p>Titre original (si applicable) :</p>
      <p>Extraits et citations :</p>
      <p>Quatrième de couverture / Résumé :</p>
      <p>Contexte :</p>
      <p>Structure :</p>
      <p>Analyse :</p>
      <p>À propos de l'auteur.ice :</p>
      <p>Sources :</p>
      <p>Pour aller plus loin :</p>`
    case 'Romans autobiographiques':
    case 'Autobiographies':
    case 'Romans':
    case 'Bandes dessinées':
      return `<p>Titre original (si applicable) :</p>
      <p>Extraits et citations :</p>
      <p>Quatrième de couverture / Résumé :</p>
      <p>Contexte et analyse :</p>
      <p>À propos de l'auteur.ice :</p>
      <p>Sources :</p>
      <p>Pour aller plus loin :</p>`
    case 'Films':
    case 'Courts métrages':
    case 'Séries':
      return `<p>Titre original (si applicable) :</p>
      <p>Acteur.ices principaux/principales :</p>
      <p>Synopsis :</p>
      <p>Contexte :</p>
      <p>À propos du/des réalisateur.ices :</p>
      <p>Pour aller plus loin :</p>`
    case 'Documentaires':
      return `<p>Titre original (si applicable) :</p>
      <p>Épisodes (si applicable) :</p>
      <p>Synopsis :</p>
      <p>Lien / Voir extrait :</p>
      <p>À propos du documentaire :</p>
      <p>À propos du/des réalisateur.ices :</p>
      <p>Pour aller plus loin :</p>`
    case 'Podcast':
      return `
      <p>À propos de(s) l'auteur.ice(s) :</p>
      <p>À propos du podcast: </p>
      <p>Épisodes :</p>
      <p>Lien du podcast : </p>
      <p>Pour aller plus loin :</p>`
    case 'Médias':
      return `<p>À propos du média :</p>
      <p>Lien :</p>
      <p>Pour aller plus loin :</p>`
    case 'Blogs':
      return `<p>Auteur.ice(s) :</p>
      <p>À propos du blog :</p>
      <p>Lien :</p>
      <p>Pour aller plus loin :</p>`
    case 'Réseaux sociaux':
      return `<p>À propos :</p>
      <p>Lien :</p>
      <p>Pour aller plus loin :</p>`
    case 'Articles':
    case 'Tribunes':
    case 'Papiers':
      return `<p>À propos :</p>
      <p>Extraits :</p>
      <p>Contexte et analyse :</p>
      <p>À propos de(s) auteur.ice(s) :</p>
      <p>Pour aller plus loin :</p>`
    case 'Mouvements':
    case 'Collectifs':
    case 'Associations':
      return `<p>Manifeste / Présentation :</p>
      <p>Objectifs :</p>
      <p>Principales actions :</p>
      <p>Pour aller plus loin :</p>`
    case 'Lois & Effets en France':
      return `<p>À propos :</p>
      <p>Pour aller plus loin :</p>`
    case 'Droits des femmes et minorités dans le monde':
      return `<p>À propos :</p>
      <p>Pays :</p>
      <p>Pour aller plus loin :</p>`
    case 'Arts vivants':
      return `<p>Titre original (si applicable) :</p>
      <p>Synopsis :</p>
      <p>À propos de la pièce :</p>
      <p>À propos de l'artiste :</p>
      <p>Pour aller plus loin :</p>`
    case 'Arts plastiques':
    case 'Photographie':
    case 'Peinture':
      return `<p>À propos de l'artiste :</p>
      <p>Oeuvres principales et leurs descriptions / analyses :</p>
      <p>Contexte :</p>
      <p>Pour aller plus loin :</p>`
    case 'Ressources jeunesse':
      return `<p>Extraits et citations :</p>
      <p>Quatrième de couverture / résumé :</p>
      <p>À propos de(s) auteur.ice(s) :</p>
      <p>Pour aller plus loin</p>`
    case 'Portraits':
      return `<p>Date de naissance (/ de décès) :</p>
      <p>Nationalité :</p>
      <p>Profession(s) :</p>
      <p>Citations :</p>
      <p>Parcours :</p>
      <p>Bibliographie (si applicable) :</p>
      <p>Actions majeures (si applicable) :</p>
      <p>Concepts majeurs / éléments de pensée (si applicable) :</p>
      <p>Sources :</p>
      <p>Pour aller plus loin :</p>`
    case 'Acronymes':
    case 'Notions':
    case 'Concepts':
      return `<p>Définition :</p>
      <p>Dates et moments phares (si applicable) :</p>
      <p>Idées principales et textes fondateurs (si applicable) :</p>
      <p>Figures majeures (si applicable) :</p>
      <p>Pour aller plus loin :</p>`
    default:
      return null
  }
}

export default switchForm
