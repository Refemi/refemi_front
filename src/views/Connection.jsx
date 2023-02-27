import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Context
import { UserContext } from "../App";

// import JS + JSON
import translationKeys from "../utils/translationKeys.json";
import { signUp, signIn } from "../services/getData";

const isEmailValid = (email) => {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regex.test(email);
};

// COMPONENT
export default function Connection() {
  const frenchKeys = translationKeys[0].french;

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

  const setUserData = (user, accessToken, isLoggedIn) => {
    setUserCredentials(user);
    setToken(accessToken);
    setIsLoggedIn(isLoggedIn);
  };

  // Handles the case of login
  const onSubmit = async (data) => {
    let error = undefined;

    switch (sign) {
      case "signin":
        error = await signIn(data, setUserData);
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
          setUserData({ name: "", mail: "", role: "" }, null, false);
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
        {frenchKeys.wantToCollaborate}
      </h2>

      {!!isUserCreated && (
        <p className="has-text-success">{frenchKeys.accountCreated}</p>
      )}

      <h3>
        {sign === "signin" || isUserCreated
          ? frenchKeys.signIn
          : sign === "signup"
          ? frenchKeys.signUp
          : null}
      </h3>

      {error && <p className="has-text-danger">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="borders is-flex is-flex-direction-column is-align-items-center"
      >
        {!isUserCreated && (
          <section className="auth">
            {sign === "signup" && (
              <fieldset className="is-flex is-flex-direction-column auth-field">
                <label>{frenchKeys.userName}</label>
                <input
                  type="text"
                  placeholder="Francis Noname"
                  className={`form-input ${errors.name && "error"}`}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="error">frenchKeys.incorrectUserName</p>
                )}
              </fieldset>
            )}

            <fieldset className="is-flex is-flex-direction-column auth-field">
              <label>{frenchKeys.userEmail}</label>
              <input
                type="text"
                placeholder={frenchKeys.emailPlaceHolder}
                name="email"
                className={`form-input ${errors.email && "error"}`}
                {...register("email", {
                  required: true,
                  validate: isEmailValid,
                })}
              />
              {errors.email && (
                <p className="error">{frenchKeys.incorrectUserEmail}</p>
              )}
            </fieldset>

            <fieldset className="is-flex is-flex-direction-column auth-field">
              <label>{frenchKeys.password}</label>
              <input
                ref={passwordInput}
                type="password"
                placeholder={frenchKeys.password}
                className={`form-input ${errors.password && "error"}`}
                {...register("password", { required: true })}
              />
              {errors.password && (
                <section>
                  <p className="error">{frenchKeys.incorrectPassword}</p>
                  <ol className="auth-field-list">
                    <li className="error">{frenchKeys.sixCharacters}</li>
                    <li className="error">{frenchKeys.majAndMin}</li>
                    <li className="error">{frenchKeys.oneNumber}</li>
                    <li className="error">{frenchKeys.oneSpecialCharacter}</li>
                  </ol>
                </section>
              )}
            </fieldset>

            {sign === "signup" && (
              <fieldset className="is-flex is-flex-direction-column auth-field">
                <label>{frenchKeys.confirmPassword}</label>
                <input
                  type="password"
                  placeholder={frenchKeys.confirmPassword}
                  className="form-input"
                  {...register("confirm_password", {
                    required: true,
                    validate: (v) =>
                      passwordInput.current.length > 0 &&
                      v === passwordInput.current,
                  })}
                />
                {errors.confirm_password && (
                  <p className="error">{frenchKeys.passwordsDontMatch}</p>
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
                {frenchKeys.connection}
              </button>
              {!isUserCreated && (
                <button
                  className="darkblue-bg send-btn has-text-white mt-6"
                  type="submit"
                >
                  {frenchKeys.validateAccount}
                </button>
              )}
            </section>
          ) : (
            <section>
              <button
                className="darkblue-bg send-btn has-text-white pointer  mt-6"
                type="submit"
              >
                {frenchKeys.signIn}
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
                  {frenchKeys.createAccount}
                </button>
              )}
            </section>
          )}
        </div>
      </form>
    </main>
  );
}
