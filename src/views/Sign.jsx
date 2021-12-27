import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import http from "../services/http-common";

import { UserCredentials } from "../App";

// CSS
import "../css/forms.css";

const isEmailValid = (email) => {
  const regex = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  );
  return regex.text(email);
};

/* const formError = () => {
  return ' Une erreur est survenue'
} */

export default function Sign() {
  const { userCredentials, setUserCredentials, setToken, isLogged, setLogged } =
    useContext(UserCredentials);

  const { sign } = useParams();
  const history = useHistory();

  const {
    register,
    handleSubmit /* ,
    formState: { errors } */,
  } = useForm();

  const signUp = (data) => {
    return http
      .post(`${REACT_APP_API}/register`, {
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
      .post(
        `${REACT_APP_API}/login`,
        {
          mail: data.mail,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": true,
          },
          credentials: "same-origin",
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .then((response) => {
        if (
          response.data.accessToken === null ||
          response.data.accessToken === undefined
        ) {
          return;
        }

        setUserCredentials({
          name: response.data.name,
          mail: response.data.mail,
          role: response.data.role,
        });

        setToken(response.data.accessToken);

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: response.data.name,
            mail: response.data.mail,
            role: response.data.role,
          })
        );

        localStorage.setItem("token", response.data.accessToken);
        setLogged(true);
      })
      .catch((error) => console.log(error));
  };
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
  useEffect(() => {
    switch (sign) {
      case "signin":
      case "signup":
        isLogged && history.push("/dashboard");
        break;
      case "signout":
        userCredentials.accessToken === null
          ? history.push("/")
          : localStorage.removeItem("token");
        localStorage.removeItem("user");

        setLogged(false);
        setUserCredentials({
          name: "",
          mail: "",
          role: "",
          accessToken: null,
        });

        history.push("/auth/signin");
        break;
      default:
        history.push("/");
    }
  }, [history, isLogged, sign, userCredentials, setLogged, setUserCredentials]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-column align-center margin-top20">
      <p>Envie de collaborer et de proposer de nouvelles références ?</p>
      <p className="margin-bottom10">
        Devenez contributeur·ice en&nbsp;
        {sign === "signin"
          ? "vous connectant"
          : sign === "signup"
          ? "vous créant un compte"
          : null}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="borders flex flex-column align-center margin-bottom10"
        style={{ minWidth: "30vw" }}
      >
        {sign === "signup" && (
          <div className="margin-input flex flex-column width80">
            <label>Nom</label>
            <input
              type="text"
              placeholder="Nom de lutilisateur"
              className="form-input"
              {...register("name", { required: true })}
            />
          </div>
        )}

        <div className="margin-input flex flex-column width80">
          <label>Email</label>
          <input
            type="text"
            placeholder="Adresse mél"
            name="email"
            className="form-input"
            {...register("mail", { required: true })}
          />
        </div>

        <div className="margin-input flex flex-column width80">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            className="form-input"
            {...register("password", { required: true, minLength: 6 })}
          />
        </div>
        {sign === "signup" && (
          <div className="margin-input flex flex-column width80">
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
          </div>
        )}
        {sign === "signup" ? (
          <input
            className="margin-bottom20 darkblue-bg send-btn text-white"
            type="submit"
            value="Créer un compte"
          />
        ) : (
          <div className="flex justify-between">
            <input
              className="darkblue-bg send-btn text-white pointer"
              type="submit"
              value="Se connecter"
            />
            <button
              className="darkblue-bg send-btn text-white pointer"
              onClick={() => history.push("/auth/signup")}
            >
              Créer un compte
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
