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

// COMPONENT
export default function FormReference({ category, categories, reference }) {
  const { token, userCredentials } = useContext(UserCredentials);
  const [content, setContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isSent, setIsSent] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const currentCategory = categories.find((clickedCategory) => clickedCategory.name === category);

  const onSubmit = (data) => {
    if (reference) {
      const postData = Object.entries(data).reduce((put, [key, value]) => {
        console.log(reference, data)
        if (reference[key] !== value) {
          put[key] = value;
        }

        return put;
      }, {});

      if (Object.keys(postData).length > 0) {
        console.log(postData)
        http
          .put(`references/${reference.id}`, {
            postData 
          }, {
            headers: {
              "x-access-token": token,
            },
          })
          .then((response) => {
            if (response.status === 202) {
              setIsSent(true);
            }
          })
          .catch((error) => {
            console.log(error)
          });
      }
    } else {
      http
        .post("references", {
          reference_name: data.reference_name,
          reference_country_name: country,
          reference_date: data.reference_date,
          reference_content: content,
          reference_category_id: currentCategory.id
        }, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            setIsSent(true);
          }
        })
    }
  };
  

  const onValid = () => {
    http
      .put(`references/${reference.id}`, {
        reference_status: true
      }, {
        headers: {
          "x-access-token": token
        }
      })
      .then((response) => {
        if (response.status === 202) {
          setIsSent(true);
        }
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      setCountries(await getCountries());
    };

    fetchData();
  }, [setCountries]);

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(reference.content ? reference.content : switchForm(currentCategory.label))
        )
      )
    );

    if (reference) {
      setCountry(reference.country);
    }
  }, [reference, currentCategory]);

  useEffect(() => {
    setContent(convertToHTML(editorState.getCurrentContent()));
  }, [editorState])

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
        className="borders is-flex is-flex-direction-column is-align-items-center"
      >
        <h2 className="m-6">Catégorie actuelle : {currentCategory.label}</h2>
        <fieldset className="is-flex is-flex-direction-column ">
          <label htmlFor="reference_name" className="required">
            Nom / Titre
          </label>
          <input
            type="text"
            className="form-input"
            {...register("reference_name", { required: true })}
            value={reference.name ? reference.name : ""}
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
          <label htmlFor="reference_name" className="required">
            Année
          </label>
          <input
            type="text"
            className="form-input"
            {...register("reference_date", { required: true })}
            value={reference.date ? reference.date : ""}
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
          value={Object.entries(reference).length > 0 ? "Modifier" : "Envoyer"}
          className="darkblue-bg send-btn has-text-white mt-6"
        />
        {reference && reference.status === false && userCredentials.role !== roles.CONTRIBUTOR && (
          <span
            className="darkblue-bg send-btn has-text-white mt-6"
            onClick={() => onValid()}
          >
            Valider
          </span>
        )}
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