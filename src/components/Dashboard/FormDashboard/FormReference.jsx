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
import { UserCredentials } from "../../../App";

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

  return await http
    .post("references", contribution, {
      headers: {
        "x-access-token": token,
      },
    })
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
    return await http
      .put(`references/${contribution.reference_id}`, {
        reference_name: contribution.reference_name,
        reference_date: contribution.reference_date,
        reference_country_name: contribution.reference_country,
        reference_content: contribution.reference_content,
        reference_status: 1
      }, {
        headers: {
          "x-access-token": token
        }
      })
      .then((response) => {
        if (response.status === 202) {
          return true;
        }
      })
      .catch((error) => {
        return false;
      })
  }

  return false
}


// COMPONENT
export default function FormReference({ category, categories, reference }) {
  const { token, userCredentials } = useContext(UserCredentials);
  const [content, setContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML("")
    )
  ));
  const [isSent, setIsSent] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [isValidated, setValidated] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("");

  const handleEditorChange = (state) => {
    setEditorState(state);
    setContent(convertToHTML(editorState.getCurrentContent()));
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

    if (Object.entries(reference).length > 0) {
      setIsSent(putContribution(contribution, token));
    } else {
      setIsSent(postContribution(contribution, token));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    setCurrentCategory(categories.find(({ name }) => name === category));
  }, [categories, category])

  useEffect(() => {
    const fetchData = async () => {
      setCountries(await getCountries());
    };

    fetchData();
  }, [setCountries]);

  useEffect(() => {
    if (currentCategory !== "") {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(Object.entries(reference).length > 0 && reference.content !== "" ? reference.content : switchForm(currentCategory.name))
          )
        )
      );
    }
  }, [reference, currentCategory]);

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
          Votre contribution a bien été envoyée et sera examinée par un.e
          modérateur.ice. Vous serez informé.e par email dès sa validation !
        </p>
        <p>Un grand merci pour votre participation !</p>
      </div>
    ) : (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="borders is-flex is-flex-direction-column is-align-items-center p-5"
      >
        <h2>Catégorie actuelle : {currentCategory.label}</h2>
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
            defaultInputValue={reference.country ? reference.country : ""}
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
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  reference: PropTypes.object
};

FormReference.defaultProps = {
  reference: {}
};