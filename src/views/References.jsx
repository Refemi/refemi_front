import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import http from '../services/http-common'

import ListReferences from '../components/ListReferences'
import WidgetCat from '../components/WidgetCat'

import '../css/categories.css'
import '../css/references.css'

const getCategories = async (categoryName) => {
  return await fetch(`${REACT_APP_API}/categories/${categoryName}`)
    .then(response => {
      if (response.status === 200) {
        return response.data
      }
    })
    .then(data => data.subCategories)
}
const getReferencesByCategory = async (categoryName) => {
  return await fetch(`${REACT_APP_API}/references/category/${categoryName}`)
    .then(response => {
      if (response.status === 200) {
        return response.data
      }
    })
    .then(data => data.references)
}

export default function References () {
  const { categoryName, themeName } = useParams()
  const history = useHistory()

  const [references, setReferences] = useState([])
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (categoryName !== undefined) {

        setSubCategories(await getCategories(categoryName))
        setReferences(await getReferencesByCategory(categoryName))
      } else if (themeName !== undefined) {
        console.log('faire les fonctions pour récupérer les themes')
      }
    }
    fetchData()
  }, [categoryName, setSubCategories, setReferences])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div
      style={{ width: '80%', margin: '20vh auto' }}
      className="flex flex-column borders padding5 position-relative"
    >
      { categoryName && (<WidgetCat subCategories={subCategories} />) }

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
