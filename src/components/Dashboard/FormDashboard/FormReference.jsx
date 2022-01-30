import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
import axios from "axios";

// React Draf Wysiwyg editor CSS
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// JS
import switchForm from "../../../utils/switchOptions";
import roles from "../../../utils/roles";
import http from "../../../services/http-common";

// Context
import { DataContext, UserContext } from "../../../App";

// Get countries list from external API
const getCountries = async () => {
  return await axios.get("https://restcountries.com/v3.1/all")
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
    })
    .then((response) =>
      response.map((countryResult) => ({
        value: countryResult.translations.fra.common.toLowerCase(),
        name: countryResult.translations.fra.common.toLowerCase(),
        label: countryResult.translations.fra.common,
      }))
    );
};

// Requests to the API to send / update a contribution
const postContribution = async (contribution, token) => {
  return await http(token)
    .post("references", contribution)
    .then((response) => {
      if (response.status === 202) {
        return true
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
const putContribution = async (contribution, token) => {
  if (Object.keys(contribution).length > 0) {
    return await http(token)
      .put(`references/${contribution.reference_id}`, {
        ...contribution,
        reference_status: 1
      })
      .then((response) => {
        if (response.status === 202) {
          return true;
        }
      })
      .catch(() => {
        return false;
      })
  }

  return false
}


/**
 * @description Displays the form for adding / modifying references
 * @param {string} props.category 
 * @param {object} props.reference
 * @return {JSX.Element}
 */
export default function FormReference({ category, reference }) {
  const { token, userCredentials } = useContext(UserContext);
  const { categories } = useContext(DataContext);
  const [content, setContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML("")
    )
  ));
  const [isSent, setIsSent] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [currentCategory, setCurrentCategory] = useState(undefined);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };


  const onSubmit = ({ reference_name, reference_date }) => {
    const contribution = {
      reference_id: reference ? reference.id : null,
      reference_name: reference_name,
      reference_date: reference_date,
      reference_country_name: country,
      reference_content: content,
      reference_category_id: currentCategory.id
    }

    (async () => {
      if (Object.entries(reference).length > 0) {
        setIsSent(await putContribution(contribution, token));
      } else {
        setIsSent(await postContribution(contribution, token));
      }  
    })();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => setCountries(await getCountries()))();
  }, []);

  useEffect(() => {
    setContent(convertToHTML(editorState.getCurrentContent()));
  }, [editorState])

  useEffect(() => {
    setCurrentCategory(categories.find(({ id }) => id === parseInt(category)));
  }, [categories, category])

  // 
  useEffect(() => {
    if (currentCategory !== undefined) {
      if (Object.entries(reference).length > 0) {
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(Object.entries(reference).length > 0 && reference.content !== "" ? reference.content : switchForm(currentCategory.name))
            )
          )
        );
      } else {
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(switchForm(currentCategory.name))
            )
          )
        );
      }
    }
  }, [reference, currentCategory]);

  // Assign the new Editor content to the setContent state, converted to HTML
  useEffect(() => {
    setContent(convertToHTML(editorState.getCurrentContent()));
  }, [editorState])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    isSent ? (
      <div className="has-text-justified">
        <p>
          Votre contribution a bien été envoyée et sera examinée par un·e
          modérateur·ice. Vous serez informé·e par email dès sa validation !
        </p>
        <p>Un grand merci pour votre participation !</p>
      </div>
    ) : (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="borders is-flex is-flex-direction-column is-align-items-center"
      >
        <h2 className="m-6">Catégorie actuelle : {currentCategory && (currentCategory.label)}</h2>
        <fieldset className="is-flex is-flex-direction-column ">
          <label htmlFor="reference_name" className="required">
            Nom / Titre
          </label>
          <input
            type="text"
            className="form-input"
            {...register("reference_name", { required: true })}
            defaultValue={reference.name ? reference.name : ""}
          />
          {errors.reference_name && (
            <span className="error">Veuillez renseigner ce champ</span>
          )}
        </fieldset>

        <fieldset className="is-flex is-flex-direction-column">
          <label htmlFor="reference_country_name" className="required">
            Pays d&apos;origine
          </label>
          <Select
            onChange={(e) => setCountry(e.label)}
            options={countries}
            className="form-input"
            defaultInputValue={reference.country_name ? reference.country_name : ""}
          />
        </fieldset>

        <fieldset className="is-flex is-flex-direction-column">
          <label htmlFor="reference_date" className="required">
            Année
          </label>
          <input
            type="text"
            className="form-input"
            {...register("reference_date")}
            defaultValue={reference.date ? reference.date : ""}
          />
        </fieldset>

        <fieldset className="is-flex is-flex-direction-column ">
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

        <fieldset className="is-flex is-flex-direction-column">
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
          value={!!reference.status === false && userCredentials.role !== roles.CONTRIBUTOR ? "Valider" : Object.entries(reference).length > 0 ? "Modifier" : "Envoyer"}
          className="darkblue-bg send-btn has-text-white mt-6"
        />
      </form>
    )
  );
}

FormReference.propTypes = {
  category: PropTypes.number.isRequired,
  reference: PropTypes.object
};

FormReference.defaultProps = {
  reference: {}
};