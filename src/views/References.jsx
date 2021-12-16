import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import ListReferences from '../components/ListReferences'
import WidgetCat from '../components/WidgetCat'

import '../css/categories.css'
import '../css/references.css'

const References = () => {
  const { categoryName } = useParams()
  const history = useHistory()

  const [references, setReferences] = useState([])
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/categories/${categoryName}`)
      .then(response => response.json())
      .then(response => setSubCategories(response.subCategories))

    fetch(`http://localhost:8000/references/category/${categoryName}`)
      .then(response => response.json())
      .then(response => setReferences(response.references))
  }, [categoryName, setSubCategories, setReferences])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div
      style={{ width: '80%', margin: '20vh auto' }}
      className="flex flex-column borders padding5 position-relative"
    >
      <WidgetCat subCategories={subCategories} />

      <button
        className="align-self-right send-btn darkblue-bg text-white"
        onClick={ () => history.goBack() }
      >
        Retour
      </button>

      {subCategories.map(subCategory => references.filter(reference => reference.category === subCategory.name).length > 0 &&
        <ListReferences
          key={subCategory.id}
          title={subCategory.label}
          name={subCategory.name}
          references={ references.filter(reference => reference.category === subCategory.name) }
        />
      )}
    </div>
  )
}

export default References
