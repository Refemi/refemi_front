import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import http from "../services/http-common";

// Context
import { UserContext } from "../App";

// Regex to verify email validity
const isEmailValid = (email) => {
  const regex = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  );
  return regex.text(email);
};

/* const formError = () => {
  return ' Une erreur est survenue'
} */

// COMPONENT
export default function Connection() {
  const {
    userCredentials,
    setUserCredentials,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(UserContext);

  const { sign } = useParams();
  const history = useHistory();

  const {
    register,
    handleSubmit /* ,
    formState: { errors } */,
  } = useForm();

  // TODO: why does a signUp variable redirects to a signin address when the usEffect takes you to dashboard?
  const signUp = (data) => {
    return http
      .post(`auth/signIn`, {
        name: data.name,
        mail: data.mail,
        password: data.password,
      })
      .then(
        (response) => response.status !== 201 && history.push("/auth/signin")
      );
  };
  /* const handleEmailValidation = email => {
      console.log('ValidateEmail was called with', email)
      
      const isValid = isValidEmail(email)
      
      const validityChanged =
      (errors.email && isValid) || (!errors.email && !isValid)
      
      if (validityChanged) {
        console.log('Fire tracker with', isValid ? 'Valid' : 'Invalid')
      }
      
      return isValid
    } */

  const signIn = (data) => {
    return http
      .post(`/auth/signIn`, {
        mail: data.mail,
        password: data.password,
      }, {
          headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": true,
          },
          credentials: "same-origin",
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then(({ accessToken, user }) => {
        if ( accessToken === null || accessToken === undefined) {
          return;
        }

        setUserCredentials({
          name: user.name,
          mail: user.email,
          role: user.role,
        });
        setToken(accessToken);
        setIsLoggedIn(true)
      })
      .catch((error) => console.log(error));
  };

  // Handles the case of login
  const onSubmit = (data) => {
    switch (sign) {
      case "signin":
        signIn(data);
        break;
      case "signup":
        signUp(data);
        break;
      default:
        console.log("Erreur");
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
          setUserCredentials({
            name: "",
            mail: "",
            role: "",
          });
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
    <main className="is-flex is-flex-direction-column is-align-items-center">
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
              placeholder="Nom de lutilisateur"
              className="form-input"
              {...register("name", { required: true })}
            />
          </fieldset>
        )}

        <fieldset className="is-flex is-flex-direction-column ">
          <label>Email</label>
          <input
            type="text"
            placeholder="Adresse mél"
            name="email"
            className="form-input"
            {...register("mail", { required: true })}
          />
        </fieldset>

        <fieldset className="is-flex is-flex-direction-column ">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            className="form-input"
            {...register("password", { required: true, minLength: 6 })}
          />
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
                minLength: 6,
              })}
            />
          </fieldset>
        )}
        {sign === "signup" ? (
          <button
            className="darkblue-bg send-btn has-text-white mt-6"
            type="submit"
          >
            Créer un compte
          </button>
        ) : (
          <fieldset className="is-flex is-justify-content-space-between">
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
          </fieldset>
        )}
      </form>
    </main>
  );
}
