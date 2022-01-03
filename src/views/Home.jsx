import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import http from "../services/http-common";
import { BiCategoryAlt } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

// Components
import Counter from "../components/Counter";

// Get counters for homepage
// TODO: wouldn't it be better to write a general algorithm that counts stuff and that we could use for: all references, validated/pending references in dashboards rather than calling server? We could then also use this bit of code to show the number of results on search page, but also everytime we display a list of references. And we'd call server only for: number of contributorsa and monthly references?
const getHomeCounters = async () => {
  return await http
    .get("counter/homecounter")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ totalReferences, totalContributors, monthlyReferences }) => ({
      totalReferences,
      totalContributors,
      monthlyReferences,
    }));
};

// COMPONENT
export default function Home() {
  const [totalRefs, setTotalRefs] = useState(0);
  const [totalContributors, setTotalContributors] = useState(0);
  const [monthRefs, setMonthRefs] = useState(0);

  const history = useHistory();

  // Are variables necessery for that?
  const toCategories = () => history.push("/categories");
  const toThemes = () => history.push("/themes");
  const toLogin = () => history.push("/auth/signin");

  // Waits for data to be ready before distributong it in state so that when the page loads it gets all needed data
  useEffect(() => {
    const fetchData = async () => {
      const { totalReferences, totalContributors, monthlyReferences } =
        await getHomeCounters();
      setTotalRefs(totalReferences);
      setTotalContributors(totalContributors);
      setMonthRefs(monthlyReferences);
    };

    fetchData();
  }, [setTotalRefs, setTotalContributors, setMonthRefs]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-text-color home">
      <section className="is-flex is-justify-content-space-around counters-container mb-6">
        <h2 className="is-align-self-center counter-box box grey-bg-opacity">
          <Counter value={totalRefs} />
          <p className="is-align-self-center is-uppercase has-text-centered counter-text">
            Références
          </p>
        </h2>

        <h2 className="is-align-self-center counter-box box darkblue-bg-opacity">
          <Counter value={totalContributors} />
          <p className="is-align-self-center is-uppercase has-text-centered counter-text">
            Contributeurs
          </p>
        </h2>

        <h2 className="is-align-self-center counter-box box aqua-bg-opacity">
          <Counter value={monthRefs} />
          <p className="is-align-self-center is-uppercase has-text-centered counter-text">
            nouveautés
          </p>
        </h2>
      </section>
      <section className="home-text">
        <hr />
        <h3 className="has-text-centered line-height is-size-4 text-center">
          Qu&apos;est-ce que&nbsp;
          <span className="refemi is-size-3">refemi</span> ?
        </h3>
        <hr />
        <article className="has-text-justified is-size-5 paragraph-container">
          <h4 className="darkblue-text refemi has-text-centered">
            Une plateforme collaborative:
          </h4>
          <p className="m-4">
            qui centralise des essais, des ouvrages théoriques, des romans, des
            documentaires, des films, des podcasts... pour vous permettre de
            vous questionner, d’avancer et d’aiguiser votre esprit critique tout
            en nourrissant votre curiosité.
          </p>
        </article>
        <hr />
        <article className="has-text-justified is-size-5 paragraph-container">
          <h4 className="darkblue-text refemi has-text-centered">
            Des ressources accessibles :
          </h4>
          <p className="m-4">
            refemi a été conçu comme un outil pour vous apporter du contenu, que
            vous soyez un.e expert.e dans un domaine à la recherche de travaux
            pointus ou que vous débutiez votre cheminement.
          </p>
        </article>
        <hr />
        <article className="has-text-justified is-size-5 paragraph-container">
          <h4 className="darkblue-text refemi has-text-centered">
            Une concept inclusif :
          </h4>
          <p className="m-4">
            notre vocation est de présenter des œuvres appartenant à différents
            courants féministes, inscrites dans une temporalité large et en
            provenance du monde entier. Nous ne revendiquons pas d’affiliation à
            un courant de pensée particulier. Notre travail consiste à vous
            apporter des éléments pour approfondir vos réflexions et vos propres
            recherches. Ce projet, bien qu’à notre initiative, est un projet
            commun et ouvert à tous.tes.
          </p>
        </article>
        <hr />
        <p className="has-text-centered">
          Bienvenue sur <span className="refemi">refemi</span>,
          <br />
          Margaux et Laura
        </p>
        <hr />
      </section>
      <section className="is-flex is-justify-content-space-around second-menu">
        <button className="cat-btn pointer" onClick={toCategories}>
          <span className="box grey-bg-opacity has-text-white is-relative">
            <BiCategoryAlt className="position-absolute-icon" size={100} />
          </span>

          <h4 className="is-uppercase has-text-centered counter-value">
            Catégories
          </h4>
        </button>

        <button className="cat-btn pointer" onClick={toThemes}>
          <span className="box darkblue-bg-opacity has-text-white is-relative">
            <BsList className="position-absolute-icon" size={100} />
          </span>
          <h4 className="is-uppercase has-text-centered counter-value">
            Thèmes
          </h4>
        </button>

        <button
          className="is-align-self-center cat-btn pointer"
          onClick={toLogin}
        >
          <span className="box aqua-bg-opacity has-text-white is-relative">
            <AiFillPlusCircle className="position-absolute-icon" size={100} />
          </span>
          <h4 className="is-uppercase has-text-centered counter-value">
            contribuer
          </h4>
        </button>
      </section>
    </main>
  );
}
