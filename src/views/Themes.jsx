import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'

import '../css/themes.css'

import Button from '../components/Button/Button'

// Context
import { AllThemes } from '../App'

export default function Themes () {
  const { themes } = useContext(AllThemes)

  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="margin-bottom20 text-center flex flex-column">
      <p className="margin-bottom5">Cliquez sur un thème pour afficher les références associées</p>

      <div className="flex justify-center">
        <div className="flex flex-wrap borders justify-between square margin10">
          {themes
            .sort(() => Math.random() > 0.5 ? 1 : -1)
            .map(theme =>
              <p
                className="margin5 pointer theme"
                key={theme.id}
                onClick={ () => history.push(`/themes/${theme.name}`) }
              >
                {theme.label}
              </p>
            )
          }
        </div>
      </div>
    </div>
  )
}
