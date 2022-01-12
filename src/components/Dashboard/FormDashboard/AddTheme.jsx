import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { UserCredentials } from "../../../App";

import http from "../../../services/http-common";


const postTheme = async (theme, token) => {

  return await http
    .post("themes", theme, {
      headers: {
        "x-access-token": token,
      },
    })
    .then((response) => {
      console.log('response', response)
      if (response.status === 201) {
        return false;
      }
    })
    .catch((error) => {
      console.log('erreur', error)
      if (error.response.status !== 202) {
        console.log(error)
        return error.response.data.message
      }
    })
}

// COMPONENT
export default function AddTheme() {
  const { token, userCredentials } = useContext(UserCredentials);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(undefined);
  const [themeName, setThemeName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ theme_label }) => {
    const fetchData = async () => {
      setError(await postTheme({ name: themeName, label : theme_label }, token));
    }

    fetchData();
  };

  useEffect(() => {
    if (error !== undefined) {
      setIsSent(true);
    }
  }, [error]);

  return (
    isSent
      ? error
          ? <>
              <p>{error}</p>
              <article className="is-flex is-flex-direction-row is-align-self-center">
                <button
                  className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
                  onClick={() => {
                    setIsSent(false);
                    setError(false);
                  }}
                >
                  Réessayer
                </button>
              </article>
            </>
          : <>
              <span className="mb-5">Theme envoyé</span>
              <article className="is-flex is-flex-direction-row is-align-self-center">
                <button
                  className="pointer send-btn darkblue-bg has-text-white is-align-self-flex-end"
                  onClick={() => {
                    setIsSent(false);
                    setError(undefined);
                    setThemeName("");
                  }}
                >
                  Nouvelle suggestion
                </button>
              </article>
            </>
      : <>
        <p className="m-3 refemi">Soumettre un nouveau thème</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="borders is-flex is-flex-direction-column is-align-items-center"
        >
          {isSent !== false && (<p>Problème</p>)}
          <fieldset className="is-flex is-flex-direction-column ">
            <label htmlFor="reference_name" className="required">
              Nom du thème
            </label>
            <input
              type="text"
              className="form-input"
              {...register("theme_label", {
                required: true,
                onChange: (e) => setThemeName(e.target.value.toLocaleLowerCase().replace(/[\W_]/, "-"))
              })}
            />
          </fieldset>
  
          <fieldset className="is-flex is-flex-direction-column ">
            <label htmlFor="reference_name" className="required">
              Raccourci
            </label>
            <input
              type="text"
              className="form-input"
              value={themeName}
              disabled
            />
          </fieldset>
          <input
            type="submit"
            value={"Envoyer"}
            className="darkblue-bg send-btn has-text-white mt-6"
          />
        </form>
      </>
  );
}

