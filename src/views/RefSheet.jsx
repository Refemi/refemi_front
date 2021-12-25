import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'

import '../css/refsheet.css'

const getReferenceById = async (id) => {
  await fetch(`${REACT_APP_API}/references/${id}`)
    .then(response => {
      if (response.status == 200) {
        return response.data
      }
    })
    .then(data => data.reference[0])
}

export default function RefSheet () {
  const { id } = useParams()
  const history = useHistory()
  const [reference, setReference] = useState({})
  const handleClick = () => history.goBack()

  useEffect(() => {
    const fetchData = async () => {
      setReference(await getReferenceById(id))
    }
    fetchData()
  }, [id, setReference])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-column align-center grey-opacity borders margin30">
      <button
        className="align-self-right send-btn darkblue-bg text-white"
        onClick={handleClick}
      >
        Retour
      </button>

      <div className="dashboard-content white-bg borders width80 margin10">
        <p className="reference-detail">
          <span className="refemi">Nom :</span> {reference.name}
        </p>
        <p className="reference-detail">Date :{reference.date}</p>
        <p className="reference-detail">
          Auteur.ice / Réalisateur.ice : {reference.author}
        </p>
        <p className="reference-detail">Discipline :{reference.field}</p>
        <p className="reference-detail">Pays :{reference.country}</p>
        <p className="reference-detail">
          Thèmes :&nbsp;
          { reference.themes && reference.themes.map(theme => <p key={theme.id}>{theme}</p>) }
        </p>
      </div>

      <img src={reference.image} alt={reference.name} />

      <div
        className="dashboard-content white-bg borders width80 margin10"
        dangerouslySetInnerHTML={{ __html: reference.content }}
      />

      <button
        className="align-self-right send-btn darkblue-bg text-white"
        onClick={handleClick}
      >
        Retour
      </button>
    </div>
  )
}
