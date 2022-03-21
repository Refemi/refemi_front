import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import http from '../services/http-common';

// Import Icons
import { BiCategoryAlt } from 'react-icons/bi';
import { BsList } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';

// Import Components
import Counter from '../components/Counter';

// Get the different counters of the homepage
const getHomeCounters = async () => {
  return await http()
    .get(`counters/home`)
    .then((response) => response.status === 200 && response.data)
    .then((data) => data)
    .catch(() => {
      return {
        totalReferences: -1,
        totalContributors: -1,
        monthReferences: -1,
      };
    });
};

/**
 * Home component
 * @returns {JSX.Element}
 */
export default function Home() {
  const [counters, setCounters] = useState([]);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => setCounters(await getHomeCounters()))();
  }, []);

  return (
    <main className='main-text-color home'>
      <section className='is-flex is-justify-content-space-around counters-container mb-6'>
        <h2 className='is-align-self-center counter-box box grey-bg-opacity'>
          <Counter value={counters.totalReferences} />
          <p className='is-align-self-center is-uppercase has-text-centered counter-text'>
            Références
          </p>
        </h2>

        <h2 className='is-align-self-center counter-box box darkblue-bg-opacity'>
          <Counter value={counters.totalContributors} />
          <p className='is-align-self-center is-uppercase has-text-centered counter-text'>
            Contributeurs
          </p>
        </h2>

        <h2 className='is-align-self-center counter-box box aqua-bg-opacity'>
          <Counter value={counters.monthReferences} />
          <p className='is-align-self-center is-uppercase has-text-centered counter-text'>
            Nouveautés
          </p>
        </h2>
      </section>
      <section className='home-text'>
        <hr />
        <h3 className='line-height is-size-4 has-text-centered m-4'>
          Qu&apos;est-ce que&nbsp;
          <span className='refemi is-size-3'>refemi</span> ?
        </h3>
        <p className='m-4  has-text-justified'>
          Refemi est né d’une volonté de centraliser sur une plateforme des
          ressources diverses provenant de supports variés sur{' '}
          <span className='has-text-weight-semibold'>
            les féminismes dans leur pluralité
          </span>
          . Nos expériences, nos vécus sont différents. Nos centres d’intérêts,
          nos questions et nos sentiments d’appartenance le sont aussi. Refemi
          est une porte d’entrée sur un vaste panel de sujets pour{' '}
          <span className='has-text-weight-semibold'>
            découvrir, se renseigner, approfondir, changer d’avis
          </span>
          .
        </p>
        <hr />
        <article className='has-text-justified is-size-5 paragraph-container'>
          <h4 className='darkblue-text refemi has-text-left m-4'>
            Une plateforme collaborative :
          </h4>
          <p className='m-4'>
            qui centralise des essais, des ouvrages théoriques, des romans, des
            documentaires, des films, des podcasts, des oeuvres d'art... pour{' '}
            <span className='has-text-weight-semibold'>
              vous permettre de vous questionner, d’avancer et d’aiguiser votre
              esprit critique tout en nourrissant votre curiosité
            </span>
            .
          </p>
        </article>
        <hr />
        <article className='has-text-justified is-size-5 paragraph-container'>
          <h4 className='darkblue-text refemi has-text-right m-4'>
            Des ressources accessibles :
          </h4>
          <p className='m-4'>
            refemi a été conçu comme{' '}
            <span className='has-text-weight-semibold'>
              un outil pour vous apporter du contenu
            </span>
            , que vous soyez un.e expert.e dans un domaine à la recherche de
            travaux pointus ou que vous débutiez votre cheminement.
          </p>
        </article>
        <hr />
        <article className='has-text-justified is-size-5 paragraph-container'>
          <h4 className='darkblue-text refemi has-text-left m-4'>
            Une concept inclusif :
          </h4>
          <p className='m-4'>
            <span className='has-text-weight-semibold'>
              notre vocation est de présenter des œuvres appartenant à
              différents courants féministes
            </span>
            , inscrites dans une temporalité large et en provenance du monde
            entier.{' '}
            <span className='has-text-weight-bold'>
              Nous ne revendiquons pas d’affiliation à un courant de pensée
              particulier
            </span>
            . Notre travail consiste à vous apporter des éléments pour
            approfondir vos réflexions et vos propres recherches. Ce projet,
            bien qu’à notre initiative, est{' '}
            <span className='has-text-weight-semibold'>
              un projet commun et ouvert à tous.tes
            </span>
            .
          </p>
        </article>
        <hr />
      </section>
      <section className='is-flex is-justify-content-space-around second-menu'>
        <button
          className='cat-btn pointer'
          onClick={() => history.push('/categories')}
        >
          <span className='box box-btn grey-bg-opacity has-text-white is-relative'>
            <BiCategoryAlt className='position-absolute-icon' size={100} />
          </span>

          <h4 className='is-uppercase has-text-centered counter-value'>
            Catégories
          </h4>
        </button>

        <button
          className='cat-btn pointer'
          onClick={() => history.push('/themes')}
        >
          <span className='box box-btn darkblue-bg-opacity has-text-white is-relative'>
            <BsList className='position-absolute-icon' size={100} />
          </span>
          <h4 className='is-uppercase has-text-centered counter-value'>
            Thèmes
          </h4>
        </button>

        <button
          className='is-align-self-center cat-btn pointer'
          onClick={() => history.push('/auth/signin')}
        >
          <span className='box box-btn aqua-bg-opacity has-text-white is-relative'>
            <AiFillPlusCircle className='position-absolute-icon' size={100} />
          </span>
          <h4 className='is-uppercase has-text-centered counter-value'>
            contribuer
          </h4>
        </button>
      </section>
    </main>
  );
}
