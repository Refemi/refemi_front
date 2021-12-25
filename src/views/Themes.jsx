import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import http from "../services/http-common"

import '../css/themes.css'

import ListReferences from '../components/ListReferences'
import Button from '../components/Button/Button'

import { AllThemes } from '../App'

function getReferences() {
  fetch(`${process.env.REACT_APP_API}/references/theme/${currentTheme.name}`)
    .then(response => response.status === 200 && (response.data))
    .then(data => data.references)
}

export default function Themes () {
  const { themes } = useContext(AllThemes)
  const [currentTheme, setCurrentTheme] = useState({})
  const [references, setReferences] = useState([])

  const history = useHistory()


  useEffect(() => {
    if (currentTheme.name) {
      setReferences(getReferences())
    }
  }, [currentTheme])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="margin-bottom20 text-center flex flex-column">
      <p className="margin-bottom5">Cliquez sur un thème pour voir les références associées</p>

      <div className="flex justify-center">
        <div className="flex flex-wrap borders justify-between square margin10">
          {
            themes
              .sort(() => Math.random() > 0.5 ? 1 : -1)
              .map(theme =>
                <p
                  className="margin5 pointer theme"
                  key={theme.id}
                  onClick={ () => history.push(`/themes/${theme.name}`) }
                >
                  {label}
                </p>
              )
          }
        </div>
      </div>
    </div>
  )
}
