import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Components
import Error from "../components/Error";
import Loader from "../components/Loader";
import RefSheetHeader from "../components/References/RefSheetHeader";
import BlueButton from "../components/Buttons/BlueButton";

// JS + JSON
import translationKeys from "../utils/translationKeys.json";
import { getReferenceById } from "../services/getData";

// TODO : use a switch for translation keys so we get matching labels depending on info we're returning
export default function RefSheet() {
  const frenchKeys = translationKeys[0].french;
  const { id } = useParams();
  const [reference, setReference] = useState({});

  // Get the reference that the user clicked
  const getReferenceContent = async () => {
    setReference(await getReferenceById(id));
  };
  useEffect(() => {
    getReferenceContent();
  }, []);

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
          />

          <BlueButton spacing="m-3" path="back" label={frenchKeys.back} />
        </div>
      )}
    </main>
  );
}
