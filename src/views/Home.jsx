import React, { useState, useEffect } from "react";

// Import Components
import CounterBox from "../components/Counters/CounterBox";
import CounterLabel from "../components/Counters/CounterLabel";

// import JS + JSON
import { getHomeCounters } from "../services/getData";
import translationKeys from "../utils/translationKeys.json";
import HomeButton from "../components/Buttons/HomeButton";

export default function Home() {
  const frenchKeys = translationKeys[0].french;
  const [counters, setCounters] = useState([]);

  const getCounters = async () => setCounters(await getHomeCounters());

  useEffect(() => {
    // we load counters only the first time. No need yet for real time updates
    // makes us gain 3 points in performance
    if (counters.length === 0) getCounters();
  }, [counters]);

  return (
    <main className="main-text-color home">
      <section className="is-flex is-justify-content-space-around counters-container mb-6">
        <article className="is-align-self-center counter-box box grey-bg-opacity">
          <CounterBox value={counters.totalReferences} />
          <CounterLabel label={frenchKeys.references} />
        </article>

        <article className="is-align-self-center counter-box box darkblue-bg-opacity">
          <CounterBox value={counters.totalContributors} />
          <CounterLabel label={frenchKeys.contributors} />
        </article>

        <article className="is-align-self-center counter-box box aqua-bg-opacity">
          <CounterBox value={counters.monthReferences} />
          <CounterLabel label={frenchKeys.news} />
        </article>
      </section>
      <section className="home-text">
        <hr />
        <h2 className="line-height is-size-4 has-text-centered m-4">
          Qu&apos;est-ce que&nbsp;
          <span className="refemi is-size-3">refemi</span> ?
        </h2>
        <p className="m-4  has-text-justified is-size-5">
          Refemi est né d’une volonté de centraliser sur une plateforme des
          ressources diverses provenant de supports variés sur{" "}
          <span className="has-text-weight-semibold">
            les féminismes dans leur pluralité
          </span>
          . Nos expériences, nos vécus sont différents. Nos centres d’intérêts,
          nos questions et nos sentiments d’appartenance le sont aussi. Refemi
          est une porte d’entrée sur un vaste panel de sujets pour{" "}
          <span className="has-text-weight-semibold">
            découvrir, se renseigner, approfondir, changer d’avis
          </span>
          .
        </p>
        <hr />
        <article className="has-text-justified is-size-5 paragraph-container">
          <h3 className="home-text_title darkblue-text has-text-left m-4 has-text-weight-semibold">
            Une plateforme collaborative :
          </h3>
          <p className="m-4 home-text_content">
            qui centralise des essais, des ouvrages théoriques, des romans, des
            documentaires, des films, des podcasts, des oeuvres d'art... pour{" "}
            <span className="has-text-weight-semibold">
              vous permettre de vous questionner, d’avancer et d’aiguiser votre
              esprit critique tout en nourrissant votre curiosité
            </span>
            .
          </p>
        </article>
        <hr className="home-text_separator" />
        <article className="has-text-justified is-size-5 paragraph-container">
          <h3 className="home-text_title darkblue-text has-text-right m-4 has-text-weight-semibold">
            Des ressources accessibles :
          </h3>
          <p className="m-4 home-text_content">
            refemi a été conçu comme{" "}
            <span className="has-text-weight-semibold">
              un outil pour vous apporter du contenu
            </span>
            , que vous soyez un.e expert.e dans un domaine à la recherche de
            travaux pointus ou que vous débutiez votre cheminement.
          </p>
        </article>
        <hr className="home-text_separator" />
        <article className="has-text-justified is-size-5 paragraph-container">
          <h3 className="home-text_title darkblue-text has-text-left m-4 has-text-weight-semibold">
            Une concept inclusif :
          </h3>
          <p className="m-4 home-text_content">
            <span className="has-text-weight-semibold">
              notre vocation est de présenter des œuvres appartenant à
              différents courants féministes
            </span>
            , inscrites dans une temporalité large et en provenance du monde
            entier.{" "}
            <span className="has-text-weight-bold">
              Nous ne revendiquons pas d’affiliation à un courant de pensée
              particulier
            </span>
            . Notre travail consiste à vous apporter des éléments pour
            approfondir vos réflexions et vos propres recherches. Ce projet,
            bien qu’à notre initiative, est{" "}
            <span className="has-text-weight-semibold">
              un projet commun et ouvert à tous.tes
            </span>
            .
          </p>
        </article>
        <hr className="home-text_separator" />
      </section>
      <section className="is-flex is-justify-content-space-around second-menu">
        <HomeButton
          path="/categories"
          icon="categories"
          label={frenchKeys.categories}
        />
        <HomeButton path="/themes" icon="themes" label={frenchKeys.themes} />
        <HomeButton
          path="/auth/signin"
          icon="contribute"
          label={frenchKeys.contribute}
        />
      </section>
    </main>
  );
}
