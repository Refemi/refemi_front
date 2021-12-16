import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import '../css/themes.css'

import ListReferences from '../components/ListReferences'

import { AllThemes } from '../App'

const Themes = () => {
  const { themes } = useContext(AllThemes)
  const [currentTheme, setCurrentTheme] = useState('')
  const [references, setReferences] = useState([])

  const history = useHistory()

  const getReferences = theme =>
    fetch(`http://localhost:8000/references/theme/${theme.name}`)
      .then(response => response.json())
      .then(response => setReferences(response.references))

  useEffect(() => {
    if (Object.entries(currentTheme).length > 0) {
      getReferences(currentTheme)
    }
  }, [currentTheme])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return Object.entries(currentTheme).length > 0
    ? <div
        style={{ width: '80%', margin: '20vh auto' }}
        className="flex flex-column"
      >
        <button
          className="pointer send-btn darkblue-bg text-white align-self-right"
          onClick={ () => setCurrentTheme('') }
        >
          Retour
        </button>

        <ListReferences title={currentTheme.label} references={references} />
      </div>
    : <div className="margin-bottom20 text-center flex flex-column">
        <button
          className="margin-top10 margin-end10 pointer send-btn darkblue-bg text-white align-self-right"
          onClick={ () => history.push('/') }
        >
          Retour
        </button>
        <p className="margin-bottom5">
          Cliquez sur un thème pour voir les références associées
        </p>

        <div className="flex justify-center">
          <div className="flex flex-wrap borders justify-between square margin10">
            {
              themes
                .sort(() => Math.random() > 0.5 ? 1 : -1)
                .map(theme =>
                  <p
                    className="margin5 pointer theme"
                    key={theme.id}
                    onClick={ () => setCurrentTheme(theme) }
                  >
                    {theme.label}
                  </p>
                )
            }
          </div>
        </div>
    </div>
}

export default Themes
