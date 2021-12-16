import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import FormReference from './FormReference'
import SelectReference from './SelectReference'

const NewRef = props => {
  const [currentForm, setCurrentForm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [subCategories, setSubCategories] = useState([])

  const handleChange = e => setCurrentForm(e.nativeEvent.target.value)

  useEffect(() => {
    !showForm && setCurrentForm('')
  }, [showForm])

  useEffect(() => {
    currentForm !== '' ? setShowForm(true) : setShowForm(false)
  }, [currentForm])

  return (
    <div className="dashboard dashboard-content borders flex flex-column align-center">
      <button
        className="margin-end10 pointer send-btn darkblue-bg text-white align-self-right"
        onClick={ () => props.changeIsClicked() }
      >
        Retour à mes contributions
      </button>

      <p className="margin5 refemi">Soumettre une nouvelle contribution</p>

      {showForm
        ? <div className="flex flex-column width80">
          <button
            onClick={ () => setShowForm(false) }
            className="margin-end10 pointer send-btn darkblue-bg text-white align-self-right"
          >
            Retour aux rubriques
          </button>
          <FormReference category={currentForm} subCategories={subCategories} />
        </div>
        : <SelectReference
          handleChange={handleChange}
          setSubCategories={setSubCategories}
          subCategories={subCategories}
        />
      }
    </div>
  )
}

NewRef.propTypes = {
  changeIsClicked: PropTypes.func.isRequired
}

export default NewRef
