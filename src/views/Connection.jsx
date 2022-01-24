import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import http from "../services/http-common";

// Context
import { UserContext } from "../App";

// Regex to verify email and password validity
const isPasswordValid = (email) => {
  const regex = new RegExp(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
  );
  return regex.test(email);
};
const isEmailValid = (email) => {
  console.log(email)
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

  const [errorSign, setErrorSign] = useState(false);

  const { sign } = useParams();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Register a new user and redirect to the login page
  const signUp = async (data) => {
    return await http()
      .post(`auth/signUp`, {
        userName: data.name,
        userEmail: data.email,
        userPassword: data.password,
      })
      .then((response) => {
        if (response.status === 201) {
          history.push("/auth/signin");
        }
      });
  };

  const signIn = async (data) => {
    return await http()
      .post(`/auth/signIn`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          return response.data;
        }
      })
      .then(({ accessToken, user }) => {
        if ( accessToken === null || accessToken === undefined) {
          throw new Error("No token");
        }

        setUserCredentials({
          name: user.userName,
          mail: user.userEmail,
          role: user.userRole
        });
        setToken(accessToken);
        setIsLoggedIn(true)

        return false
      })

      .catch ((error) => {
        return error;
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
      setErrorSign(true)
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
          setUserCredentials({ name: '', mail: '', role: '' });
          setToken(null)
          setIsLoggedIn(false);

          history.push("/auth/signin");
        }

        break;
      default:
        history.push("/");
    }
  }, [
    history,
    isLoggedIn,
    sign,
    userCredentials,
    setIsLoggedIn,
    setUserCredentials,
    setToken,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="auth is-flex is-flex-direction-column is-align-items-center">
      <h2 className="mt-6 has-text-weight-bold has-text-centered mx-3">
        Envie de collaborer et de proposer de nouvelles références ?
      </h2>
      <h3>
        {sign === "signin"
          ? "Connectez-vous !"
          : sign === "signup"
          ? "Devenez contributeur·ice vous créant un compte !"
          : null}
      </h3>
      {errorSign && (
        <p style={{ color: 'red', fontSize: '0.9rem' }}>
          Une erreur est survenue lors de la connexion
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="borders is-flex is-flex-direction-column is-align-items-center"
        style={{ minWidth: "30vw" }}
      >
        {sign === "signup" && (
          <fieldset className="is-flex is-flex-direction-column ">
            <label>Nom</label>
            <input
              type="text"
              placeholder="Francis Noname"
              className={`form-input ${errors.password && 'error'}`}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="error">Le pseudo n'est pas valide</p>
            )}
          </fieldset>
        )}

        <fieldset className="is-flex is-flex-direction-column ">
          <label>Courriel</label>
          <input
            type="text"
            placeholder="francisnoname@refemi.com"
            name="email"
            className={`form-input ${errors.mail && 'error'}`}
            {...register("email", { required: true, validate: isEmailValid })}
          />
          {errors.email && (
            <p className="error">Le courriel n'est pas valide</p>
          )}
        </fieldset>

        <fieldset className="is-flex is-flex-direction-column ">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            className={`form-input ${errors.password && 'error'}`}
            {...register("password", { required: true, validate: isPasswordValid })}
          />
          {errors.password && (
            <p className="error">Le mot de passe n'est pas valide</p>
          )}
        </fieldset>
        {sign === "signup" && (
          <fieldset className="is-flex is-flex-direction-column ">
            <label>Confirmation du mot de passe</label>
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="form-input"
              {...register("confirm_password", {
                required: true,
                validate: () => {} // TODO: validate the password confirmation
              })}
            />
          </fieldset>
        )}
        <div className="columns">
          {sign === "signup"
            ? (<>
                <button
                  className="darkblue-bg send-btn has-text-white mt-6"
                  type="button"
                  onClick={() => history.push("/auth/signin")}
                >
                  Connexion
                </button>
                <button
                  className="darkblue-bg send-btn has-text-white mt-6"
                  type="submit"
                >
                  Valider mon compte
                </button>
              </>
            )
            : (<>
                <button
                  className="darkblue-bg send-btn has-text-white pointer  mt-6"
                  type="submit"
                >
                  Se connecter
                </button>
                <button
                  className="darkblue-bg send-btn has-text-white pointer mt-6"
                  onClick={() => history.push("/auth/signup")}
                >
                  Créer un compte
                </button>
              </>
            )
          } 
        </div>
      </form>
    </main>
  );
}
