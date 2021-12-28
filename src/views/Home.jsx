import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import http from "../services/http-common";
import { BiCategoryAlt } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

// Components
import Counter from "../components/Counter";

import "../css/home.css";
import "../css/counter.css";

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
    .then(({ totalReferences, totalContributors, monthlyReferences}) => ({
      totalReferences,
      totalContributors,
      monthlyReferences 
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
      console.log(await getHomeCounters())
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
    <main className="margin-top20 main-text-color">
      {
        // FIXME A t-on vraiment besoin de la div qui suit ? => Maybe not. I'll clean that when refactoring branch is merged with develop and I start SEO improving
      }
        <section className="flex justify-around margin20">
          <h2 className="align-self-center box-home grey-bg text-white">
            <Counter value={totalRefs} />
            <p className="box-legend">Références</p>
          </h2>

          <h2 className="align-self-center box-home darkblue-bg text-white">
            <Counter value={totalContributors} />
            <p className="box-legend">Contributeurs</p>
          </h2>

          <h2 className="align-self-center box-home aqua-bg text-white">
            <Counter value={monthRefs} />
            <p className="box-legend">entrées ce mois</p>
          </h2>
        </section>
        <section className="margin-description">
          <h3 className="text-justify line-height text-title-like text-center">
            Qu&apos;est-ce que&nbsp;
            <span className="refemi text-title-like">refemi</span> ?
          </h3>
          <hr className="margin7" />
          <p className="text-justify line-height text-title-like">
            <span className="important refemi">
              Une plateforme collaborative :&nbsp;
            </span>
            qui centralise des essais, des ouvrages théoriques, des romans, des
            documentaires, des films, des podcasts... pour vous permettre de
            vous questionner, d’avancer et d’aiguiser votre esprit critique tout
            en nourrissant votre curiosité.
          </p>
          <hr className="margin7" />
          <p className="text-justify line-height text-title-like">
            <span className="refemi important">
              Des ressources accessibles :
            </span>
            &nbsp; refemi a été conçu comme un outil pour vous apporter du
            contenu, que vous soyez un.e expert.e dans un domaine à la recherche
            de travaux pointus ou que vous débutiez votre cheminement.&nbsp;
          </p>
          <hr className="margin7" />
          <p className="text-justify line-height text-title-like">
            <span className="important refemi">Une concept inclusif : </span>
            &nbsp; notre vocation est de présenter des œuvres appartenant à
            différents courants féministes, inscrites dans une temporalité large
            et en provenance du monde entier. Nous ne revendiquons pas
            d’affiliation à un courant de pensée particulier. Notre travail
            consiste à vous apporter des éléments pour approfondir vos
            réflexions et vos propres recherches. Ce projet, bien qu’à notre
            initiative, est un projet commun et ouvert à tous.tes.
          </p>
          <hr className="margin10" />
          <p className="text-center">
            Bienvenue sur <span className="refemi">refemi</span>,
          </p>

          <p className="text-center">Margaux et Laura</p>
        </section>
        <section className="flex justify-around">
          <button
            className="align-self-center cat-btn pointer"
            onClick={toCategories}
          >
            <span className="box align-self-center box-home grey-bg-opacity text-white position-relative">
              <BiCategoryAlt className="position-absolute top" size={100} />
            </span>

            <h4 className="box-legend ">Catégories</h4>
          </button>

          <button
            className="align-self-center cat-btn pointer"
            onClick={toThemes}
          >
            <span className="box align-self-center box-home darkblue-bg-opacity text-white position-relative">
              <BsList className="position-absolute top" size={100} />
            </span>
            <h4 className="box-legend">Thèmes</h4>
          </button>

          <button
            className="align-self-center cat-btn pointer"
            onClick={toLogin}
          >
            <span className="box align-self-center box-home aqua-bg-opacity text-white position-relative">
              <AiFillPlusCircle className="position-absolute top" size={100} />
            </span>
            <h4 className="box-legend">Suggérer une référence</h4>
          </button>
        </section>
    </main>
  );
}
