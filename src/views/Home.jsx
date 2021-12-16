import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import Counter from '../components/Counter'

import '../css/home.css'
import '../css/counter.css'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsList } from 'react-icons/bs'
import { AiFillPlusCircle } from 'react-icons/ai'

const Home = () => {
  const [totalRefs, setTotalRefs] = useState(0)
  const [totalContributors, setTotalContributors] = useState(0)
  const [monthRefs, setMonthRefs] = useState(0)

  const getGeneralData = () =>
    fetch('http://localhost:8000/counter/homecounter')
      .then(response => response.json())
      .then(response => {
        setTotalRefs(response.nbOfRefs)
        setTotalContributors(response.nbOfContributors)
        setMonthRefs(response.monthRefs)
      })

  const history = useHistory()

  useEffect(() => {
    getGeneralData()
  }, [])

  const toCategories = () => history.push('/categories')
  const toThemes = () => history.push('/themes')
  const toLogin = () => history.push('/auth/signin')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="margin-top20 main-text-color">
      <div className="">
        <div className="flex justify-around margin20">
          <div className="align-self-center box-home grey-bg text-white">
            <Counter value={totalRefs} />
            <p className="box-legend">Références</p>
          </div>

          <div className="align-self-center box-home darkblue-bg text-white">
            <Counter value={totalContributors} />
            <p className="box-legend">Contributeurs</p>
          </div>

          <div className="align-self-center box-home aqua-bg text-white">
            <Counter value={monthRefs} />
            <p className="box-legend">entrées ce mois</p>
          </div>
        </div>
        <div className="margin-description">
          <p className="text-justify line-height text-title-like text-center">
            Qu&apos;est-ce que{' '}
            <span className="refemi text-title-like">refemi</span> ?
          </p>
          <hr className="margin7" />
          <p className="text-justify line-height text-title-like">
            <span className="important refemi">
              Une plateforme collaborative :{' '}
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
            </span>{' '}
            refemi a été conçu comme un outil pour vous apporter du contenu, que
            vous soyez un.e expert.e dans un domaine à la recherche de travaux
            pointus ou que vous débutiez votre cheminement.{' '}
          </p>
          <hr className="margin7" />
          <p className="text-justify line-height text-title-like">
            <span className="important refemi">Une concept inclusif : </span>{' '}
            notre vocation est de présenter des œuvres appartenant à différents
            courants féministes, inscrites dans une temporalité large et en
            provenance du monde entier. Nous ne revendiquons pas d’affiliation à
            un courant de pensée particulier. Notre travail consiste à vous
            apporter des éléments pour approfondir vos réflexions et vos propres
            recherches. Ce projet, bien qu’à notre initiative, est un projet
            commun et ouvert à tous.tes.
          </p>
          <hr className="margin10" />
          <p className="text-center">
            Bienvenue sur <span className="refemi">refemi</span>,
          </p>

          <p className="text-center">Margaux et Laura</p>
        </div>
        <div className="flex justify-around">
          <button
            className="align-self-center cat-btn pointer"
            onClick={toCategories}
          >
            <div className="box align-self-center box-home grey-bg-opacity text-white position-relative">
              <BiCategoryAlt className="position-absolute top" size={100} />
            </div>

            <p className="box-legend ">Catégories</p>
          </button>

          <button
            className="align-self-center cat-btn pointer"
            onClick={toThemes}
          >
            <div className="box align-self-center box-home darkblue-bg-opacity text-white position-relative">
              <BsList className="position-absolute top" size={100} />
            </div>
            <p className="box-legend">Thèmes</p>
          </button>

          <button
            className="align-self-center cat-btn pointer"
            onClick={toLogin}
          >
            <div className="box align-self-center box-home aqua-bg-opacity text-white position-relative ">
              <AiFillPlusCircle className="position-absolute top" size={100} />
            </div>
            <p className="box-legend">Suggérer une référence</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
