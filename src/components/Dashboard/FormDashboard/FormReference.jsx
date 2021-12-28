import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { convertToHTML } from 'draft-convert'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// JS
import switchForm from '../../../utils/switchOptions'

// Context
import { UserCredentials } from '../../../App'

// COMPONENT
export default function FormReference ({category, subCategories}) {
  const { token } = useContext(UserCredentials)
  const [content, setContent] = useState('')
  const [editorState, setEditorState] = useState()
  const [isSent, setIsSent] = useState(false)
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')

  const convertContentToHTML = () => setContent(convertToHTML(editorState.getCurrentContent()))

  const handleEditorChange = state => {
    setEditorState(state)
    convertContentToHTML()
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const currentsubCategory = subCategories.find(subCategory => subCategory.name === category)

  const onSubmit = data => {
    fetch('http://localhost:8000/references', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      method: 'POST',
      body: JSON.stringify({
        reference_name: data.reference_name,
        reference_country_name: country,
        reference_date: data.reference_date,
        reference_content: content,
        reference_category_id: currentsubCategory.id
      })
    })

    setIsSent(true)
  }

  // Get countries list from external API
  const getCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(response => setCountries(response.map(countryResult => ({
        value: countryResult.translations.fra.common.toLowerCase(),
        name: countryResult.translations.fra.common.toLowerCase(),
        label: countryResult.translations.fra.common
      }))))
  }

  useEffect(() => {
    getCountries()
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(switchForm(currentsubCategory.label))
        )
      )
    )
  }, [currentsubCategory])

  return (
    <>
      {isSent
        ? <div className="margin20 text-justify">
            <p>
              Votre contribution a bien été envoyée et sera examinée par un.e
              modérateur.ice. Vous serez informé.e par email dès sa validation !
            </p>
            <p>Un grand merci pour votre participation !</p>
          </div>
        : <form
            onSubmit={handleSubmit(onSubmit)}
            className="borders flex flex-column align-center"
          >
            <h2 className="margin10"> Catégorie :{currentsubCategory.label}</h2>
            <fieldset className="margin-input flex flex-column width80">
              <label htmlFor="reference_name" className="required">
                Nom / Titre
              </label>
              <input
                type="text"
                className="form-input"
                { ...register('reference_name', { required: true }) }
              />
              {errors.reference_name && (
                <span className="error">Veuillez renseigner ce champ</span>
              )}
            </fieldset>

            <fieldset className="margin-input flex flex-column width80">
              <label htmlFor="reference_country_name" className="required">
                Pays d&apos;origine
              </label>
              <Select
                onChange={ e => setCountry(e.label) }
                options={countries}
                className="form-input"
              />
            </fieldset>

            <fieldset className="margin-input flex flex-column width80">
              <label htmlFor="reference_name" className="required">
                Année
              </label>
              <input
                type="text"
                className="form-input"
                { ...register('reference_date', { required: true }) }
              />
            </fieldset>

            <fieldset className="margin-input flex flex-column width80">
              <label htmlFor="reference-content" className="required">
                Contenu
              </label>

              <Editor
                editorState={editorState}
                toolbarClassName=""
                wrapperClassName=""
                editorClassName="form-input"
                onEditorStateChange={handleEditorChange}
              />
            </fieldset>

            <fieldset className="margin-input flex flex-column width80">
              <label htmlFor="reference-image">Image</label>
              <input
                type="file"
                className="form-input"
                name="reference-image"
                id="reference-image"
                accept="image/png, image/jpeg"
              />
            </fieldset>

              <input
                type="submit"
                value="Envoyer"
                className="darkblue-bg send-btn text-white"
              />
          </form>
      }
    </>
  )
}

FormReference.propTypes = {
  subCategories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired
}

