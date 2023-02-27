import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

// Components
import Error from "../components/Error";
import Loader from "../components/Loader";
import RefSheetHeader from "../components/References/RefSheetHeader";
import BlueButton from "../components/Buttons/BlueButton";
// Import Contexts
import { UserContext } from "../App";
// JS + JSON
import translationKeys from "../utils/translationKeys.json";
import { switchNavigationTo } from "../utils/switchOptions";
import { getReferenceById, putContribution } from "../services/getData";

// TODO : use a switch for translation keys so we get matching labels depending on info we're returning
export default function RefSheet() {
  const frenchKeys = translationKeys[0].french;
  const { id } = useParams();
  const history = useHistory();
  const [reference, setReference] = useState({});
  const { token, userCredentials } = useContext(UserContext);

  // Get the reference that the user clicked
  const getReferenceContent = async () => {
    setReference(await getReferenceById(id));
  };
  useEffect(() => {
    getReferenceContent();
  }, []);

  const navigateTo = (path) => {
    return history.push(path);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  {
    /* on submit function created to send reference id for update the reference status */
  }
  const onSubmit = async () => {
    putContribution(id, token);
    switchNavigationTo("formSent", navigateTo);
  };

  return !reference ? (
    <Error errorCode={404} message={frenchKeys.referenceNotFound} />
  ) : (
    <main className="is-flex is-flex-direction-column is-align-items-center">
      {Object.entries(reference).length === 0 ? (
        <Loader />
      ) : (
        <div className="is-flex is-flex-direction-column is-align-items-center reference-content">
          <BlueButton spacing="m-3" path="back" label={frenchKeys.back} />

          <RefSheetHeader reference={reference} key={uuidv4()} />

          <article
            className="reference-content-details white-bg borders  m-6"
            dangerouslySetInnerHTML={{ __html: reference.content }}
          ></article>
          <BlueButton spacing="m-3" path="back" label={frenchKeys.back} />

          {/*to validated  the reference*/}
          {reference.status === false && userCredentials.role === 3 && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="borders is-flex is-flex-direction-column is-align-items-center"
            >
              <input
                type="submit"
                className="darkblue-bg send-btn has-text-white mt-6"
                value={"Valider"}
              />
            </form>
          )}
        </div>
      )}
    </main>
  );
}
