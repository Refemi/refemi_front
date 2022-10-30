import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import http from "../services/http-common";

// Context
import { UserContext } from "../App";

/**
 * Regex to verify mail validity
 * @param {string} email
 * @return {boolean}
 */
const isEmailValid = (email) => {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regex.test(email);
};

// COMPONENT
export default function Connection() {
  const {
    userCredentials,
    setUserCredentials,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(UserContext);

  const passwordInput = useRef(null);
  const [error, setError] = useState(false);
  const [isUserCreated, setUserCreated] = useState();
  const { sign } = useParams();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm();

  passwordInput.current = watch("password");

  const signUp = async (user) => {
    return await http()
      .post(`auth/signUp`, {
        userName: user.name,
        userEmail: user.email,
        userPassword: user.password,
      })
      .then(({ status }) => {
        if (status === 201) {
          return false;
        }
      })
      .catch(({ response }) => {
        return response.data.error;
      });
  };
  /**
   * Login a user
   * @param {object} user - user data
   * @param {string} user.email - user email
   * @param {string} user.password - user password
   * @return {boolean}
   */
  const signIn = async (user) => {
    return await http()
      .post(`/auth/signIn`, {
        userEmail: user.email,
        userPassword: user.password,
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then(({ accessToken, user }) => {
        if (accessToken === null || accessToken === undefined) {
          throw new Error("No token");
        }

        setUserCredentials(user);
        setToken(accessToken);
        setIsLoggedIn(true);

        return false;
      })
      .catch(({ response }) => {
        return response.data.error;
      });
  };

  // Handles the case of login
  const onSubmit = async (data) => {
    let error = undefined;

    switch (sign) {
      case "signin":
        error = await signIn(data);
        break;
      case "signup":
        error = await signUp(data);
        break;
      default:
        return;
    }

    // If the return of the functions is an error or is not a Promise
    if (error !== undefined && error !== false) {
      setError(error);
    } else {
      setError(false);
      clearErrors();
      setUserCreated(true);
    }
  };

  // Redirections and token management
  useEffect(() => {
    switch (sign) {
      case "signin":
      case "signup":
        isLoggedIn && history.push("/dashboard");
        break;
      case "signout":
        if (userCredentials.accessToken !== null) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUserCredentials({ name: "", mail: "", role: "" });
          setToken(null);
          setIsLoggedIn(false);

          history.push("/auth/signin");
        }

        break;
      default:
        break;
    }
  }, [
    history,
    isLoggedIn,
    isUserCreated,
    sign,
    userCredentials,
    setIsLoggedIn,
    setUserCredentials,
    setToken,
  ]);

  return (
    <main className="auth is-flex is-flex-direction-column is-align-items-center">
      <h2 className="mt-6 has-text-weight-bold has-text-centered mx-3">
        Envie de collaborer et de proposer de nouvelles références ?
      </h2>

      {!!isUserCreated && (
        <p className="has-text-success">Votre compte a bien été créé</p>
      )}

      <h3>
        {sign === "signin" || isUserCreated
          ? "Connectez-vous !"
          : sign === "signup"
          ? "Devenez contributeur·ice vous créant un compte !"
          : null}
      </h3>

      {error && <p className="has-text-danger">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="borders is-flex is-flex-direction-column is-align-items-center"
      >
        {!isUserCreated && (
          <section classname="auth is-flex is-align-items-center">
            {sign === "signup" && (
              <fieldset className="is-flex is-flex-direction-column auth-field">
                <label>Nom</label>
                <input
                  type="text"
                  placeholder="Francis Noname"
                  className={`form-input ${errors.name && "error"}`}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="error">Le pseudo n'est pas valide</p>
                )}
              </fieldset>
            )}

            <fieldset className="is-flex is-flex-direction-column auth-field">
              <label>Courriel</label>
              <input
                type="text"
                placeholder="francisnoname@refemi.com"
                name="email"
                className={`form-input ${errors.email && "error"}`}
                {...register("email", {
                  required: true,
                  validate: isEmailValid,
                })}
              />
              {errors.email && (
                <p className="error">Le courriel n'est pas valide</p>
              )}
            </fieldset>

            <fieldset className="is-flex is-flex-direction-column auth-field">
              <label>Mot de passe</label>
              <input
                ref={passwordInput}
                type="password"
                placeholder="Mot de passe"
                className={`form-input ${errors.password && "error"}`}
                {...register("password", { required: true })}
              />
              {errors.password && (
                <section>
                  <p className="error">
                    Le mot de passe n'est pas valide ; il doit comporter au
                    moins :
                  </p>
                  <ol className="auth-field-list">
                    <li className="error">Six caractères de A à z</li>
                    <li className="error">
                      Dont une majuscule et une minuscule
                    </li>
                    <li className="error">Un chiffre</li>
                    <li className="error">Un caractère spécial (!, %, ?, $)</li>
                  </ol>
                </section>
              )}
            </fieldset>

            {sign === "signup" && (
              <fieldset className="is-flex is-flex-direction-column auth-field">
                <label>Confirmation du mot de passe</label>
                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  className="form-input"
                  {...register("confirm_password", {
                    required: true,
                    validate: (v) =>
                      passwordInput.current.length > 0 &&
                      v === passwordInput.current,
                  })}
                />
                {errors.confirm_password && (
                  <p className="error">
                    Les mots de passe ne correspondent pas
                  </p>
                )}
              </fieldset>
            )}
          </section>
        )}

        <div className="columns">
          {sign === "signup" ? (
            <section>
              <button
                className="darkblue-bg send-btn has-text-white mt-6"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setError(false);
                  clearErrors();
                  setUserCreated(false);
                  history.push("/auth/signin");
                }}
              >
                Connexion
              </button>
              {!isUserCreated && (
                <button
                  className="darkblue-bg send-btn has-text-white mt-6"
                  type="submit"
                >
                  Valider mon compte
                </button>
              )}
            </section>
          ) : (
            <section>
              <button
                className="darkblue-bg send-btn has-text-white pointer  mt-6"
                type="submit"
              >
                Se connecter
              </button>

              {!isUserCreated && (
                <button
                  className="darkblue-bg send-btn has-text-white pointer mt-6"
                  onClick={(e) => {
                    e.preventDefault();
                    setError(false);
                    clearErrors();
                    history.push("/auth/signup");
                  }}
                >
                  Créer un compte
                </button>
              )}
            </section>
          )}
        </div>
      </form>
    </main>
  );
}
