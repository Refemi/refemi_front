import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
// React Draf Wysiwyg editor CSS
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// JS
import {
  switchForm,
  switchNavigationTo,
} from "../../../../utils/switchOptions";
import roles from "../../../../utils/roles";
import trnaslationKeys from "../../../../utils/translationKeys.json";
import {
  getCountries,
  getFields,
  getReferencesByName,
  postContribution,
  putContribution,
} from "../../../../services/getData";

// Context
import { DataContext, UserContext } from "../../../../App";

//Displays the form for adding / modifying references
export default function MoviesAndShows({ reference }) {
  const frenchKeys = trnaslationKeys[0].french;
  const { token, userCredentials } = useContext(UserContext);
  const { categories, themes } = useContext(DataContext);
  const [content, setContent] = useState("");
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(""))
    )
  );
  const [isSent, setIsSent] = useState(false);
  const [suggestName, setSuggestName] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [referencesFound, setReferencesFound] = useState("");
  const [referenceNameInput, setReferenceNameInput] = useState("");
  const [matchReferenceName, setMatchReferenceName] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [fields, setFields] = useState([]);
  const [_, setField] = useState("");

  const history = useHistory();
  //  sessionStorage used to get category id from AddReference component
  const category = JSON.parse(sessionStorage.getItem("SelectReference"));

  // We need to change the name key into value key for the multi select to be able to detect properly the items. The rest method in map allows to change the key of an object without affecting the other keys
  const themesList = themes.map(({ name: value, ...rest }) => ({
    value,
    ...rest,
  }));

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  let themesIds = [];
  useEffect(() => {
    selectedThemes.forEach((option) => {
      themesIds.push(option.id);
    });
  }, [selectedThemes, themesIds]);

  const onSubmit = async ({ _, reference_date }) => {
    const contribution = {
      reference_id: reference ? reference.id : null,
      title: referencesFound,
      reference_date: reference_date,
      ccountries_names: country,
      authors_names: authorsNames,
      fields_ids: fieldsIds,
      content: content,
      category_id: category,
      themes_ids: themesIds,
    };

    if (Object.entries(reference).length > 0) {
      setIsSent(putContribution(contribution, token));
    } else {
      const error = await postContribution(contribution, token);
      console.log("158", error);
      if (!error) {
        setIsSent(true);
        setErrorMessage(false);
      } else {
        setErrorMessage(error);
        window.scrollTo(0, 500);
      }
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => setCountries(await getCountries()))();
    (async () => setFields(await getFields()))();
  }, []);

  let fieldsList;
  useEffect(() => {
    fieldsList = fields.map(({ name: value, ...rest }) => ({
      value,
      ...rest,
    }));
  }, [fields, fieldsList]);

  useEffect(() => {
    setContent(convertToHTML(editorState.getCurrentContent()));
  }, [editorState]);

  useEffect(() => {
    setMatchReferenceName("");
    setReferencesFound(referenceNameInput);

    // get the all Reference name from  getReferencesByName function and set into suggestName state
    (async () => setSuggestName(await getReferencesByName()))();
  }, [referenceNameInput]);

  useEffect(() => {
    setCurrentCategory(categories.find(({ id }) => id === parseInt(category)));
  }, [categories, category]);

  // Fills the EditorState, with the content of the reference if it has been sent in props,
  // or with the default content depending on the category sent in props
  useEffect(() => {
    if (currentCategory !== undefined) {
      if (Object.entries(reference).length > 0) {
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(
                Object.entries(reference).length > 0 && reference.content !== ""
                  ? reference.content
                  : switchForm(currentCategory.name)
              )
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
  }, [editorState]);

  // get value from Titre input text and set into referenceNameInput state
  const onChangeReferenceName = (event) => {
    setReferenceNameInput(event.target.value);
  };
  // get  the suggestName value and set into setMatchReferenceName state
  const onSearchReferenceName = (searchTitle) => {
    setMatchReferenceName(searchTitle);
  };

  const navigateTo = (path) => {
    return history.push(path);
  };

  return (
    <section className="mt-6 is-flex is-justify-content-center is-flex-direction-column dashboard">
      {isSent ? (
        switchNavigationTo("formSent", navigateTo)
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 borders is-flex is-flex-direction-column is-align-items-center"
        >
          <h2 className="m-6">
            {frenchKeys.currentCategory}
            {currentCategory !== undefined && currentCategory.name}
          </h2>

          <section className="is-flex is-flex-direction-column is-align-items-center">
            {errorMessage && (
              <div className="has-text-danger has-text-centered">
                <h3>{frenchKeys.impossibleToAddReference}</h3>
                <p>{errorMessage} </p>
              </div>
            )}

            <fieldset className="is-flex is-flex-direction-column">
              <label htmlFor="reference_name" className="required">
                {frenchKeys.referenceName}
              </label>
              {matchReferenceName && (
                <p className="has-text-danger has-text-centered">
                  {frenchKeys.referenceAlreadyExists}
                </p>
              )}
              <input
                type="text"
                className="form-input"
                value={referenceNameInput}
                onChange={onChangeReferenceName}
                required
              />
              {!matchReferenceName && (
                <div className="form-input_countries has-text-danger">
                  {suggestName
                    .filter((item) => {
                      const searchTitle = referenceNameInput.toLowerCase();
                      const suggestTitle = item.name.toLowerCase();

                      return (
                        searchTitle &&
                        suggestTitle.startsWith(searchTitle) &&
                        suggestTitle !== searchTitle
                      );
                    })
                    .slice(0, 6)
                    .map((item) => (
                      <div
                        onClick={() => onSearchReferenceName(item.name)}
                        key={item.id}
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              )}
            </fieldset>
            <fieldset className="">
              <label htmlFor="reference_country_name" className="required">
                {frenchKeys.country}
              </label>
              <Select
                isMulti
                required
                onChange={(c) => setCountry(c.name)}
                options={countries}
                className="form-input_countries"
                defaultInputValue={reference.country ? reference.country : ""}
              />
            </fieldset>
            <fieldset className="is-flex is-flex-direction-column">
              <label htmlFor="reference_date" className="required">
                {frenchKeys.year}
              </label>
              <input
                type="text"
                className="form-input"
                {...register("reference_date")}
                defaultValue={reference.date ? reference.date : ""}
                required
              />
            </fieldset>
            <fieldset className="is-flex is-flex-direction-column">
              <label htmlFor="reference_authors" className="required">
                Créateur.ice.s (séparer les noms par des virgules)
              </label>
              <input
                type="text"
                className="form-input"
                {...register("reference_authors")}
                defaultValue={
                  reference.authorsNames ? reference.authorsNames : ""
                }
                required
              />
            </fieldset>
            <fieldset className="is-flex is-flex-direction-column">
              <label>Extraits et citations</label>
              <textarea
                type="text"
                className="form-input"
                {...register("reference_authors")}
                defaultValue={
                  reference.extractAndQuotes ? reference.extractAndQuotes : ""
                }
                required
              />
            </fieldset>
            <fieldset className="is-flex is-flex-direction-column">
              <label>Contexte</label>
              <textarea
                type="text"
                className="form-input"
                {...register("reference_authors")}
                defaultValue={reference.context ? reference.context : ""}
                required
              />
            </fieldset>
            <fieldset className="is-flex is-flex-direction-column">
              <label>Structure</label>
              <textarea
                type="text"
                className="form-input"
                {...register("reference_authors")}
                defaultValue={reference.structure ? reference.structure : ""}
                required
              />
            </fieldset>
            <fieldset className="is-flex is-flex-direction-column">
              <label>Analyse</label>
              <textarea
                type="text"
                className="form-input"
                {...register("reference_authors")}
                defaultValue={reference.analysis ? reference.analysis : ""}
                required
              />
            </fieldset>
            <fieldset className="is-flex is-flex-direction-column">
              <label>À propos de/de la créateur.ice</label>
              <textarea
                type="text"
                className="form-input"
                {...register("reference_authors")}
                defaultValue={
                  reference.aboutAuthor ? reference.aboutAuthor : ""
                }
                required
              />
            </fieldset>
            <fieldset className="is-flex is-flex-direction-column">
              <label>Sources</label>
              <textarea
                type="text"
                className="form-input"
                {...register("reference_authors")}
                defaultValue={reference.sources ? reference.sources : ""}
                required
              />
            </fieldset>
            <fieldset className="is-flex is-flex-direction-column">
              <label>Pour aller plus loin</label>
              <textarea
                type="text"
                className="form-input"
                {...register("reference_authors")}
                defaultValue={
                  reference.toGoFurther ? reference.toGoFurther : ""
                }
                required
              />
            </fieldset>
          </section>
          <fieldset className="select-fieldset is-flex is-flex-direction-column">
            <label htmlFor="reference_country_name" className="required">
              {frenchKeys.themes}
            </label>
            <Select
              isMulti
              onChange={(e) => setSelectedThemes(e)}
              options={themesList}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </fieldset>
          <input
            type="submit"
            value={
              !!reference.status === false &&
              userCredentials.role !== roles.CONTRIBUTOR
                ? "Valider"
                : Object.entries(reference).length > 0
                ? "Modifier"
                : "envoyer"
            }
            className="darkblue-bg send-btn has-text-white mt-6"
          />
        </form>
      )}
    </section>
  );
}

MoviesAndShows.propTypes = {
  reference: PropTypes.object,
};
MoviesAndShows.defaultProps = {
  reference: {},
};
