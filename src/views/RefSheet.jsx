import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import http from "../services/http-common";
import { v4 as uuidv4 } from "uuid";

import Error from "../components/Error";
import Loader from "../components/Loader";

const getReferenceById = async (id) => {
  return await http()
    .get(`/references/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.reference[0])
    .catch(() => false);
};

export default function RefSheet() {
  const { id } = useParams();
  const history = useHistory();
  const [reference, setReference] = useState({});
  const handleClick = () => history.goBack(); // TODO: we need to make sure that in all cases it does get you to the previous page. Sometimes goBack() can be tricky

  useEffect(() => {
    // Get the reference that the user clicked
    const fetchData = async () => {
      setReference(await getReferenceById(id));
    };
    fetchData();
  }, [id, setReference]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return !reference ? (
    <Error
      errorCode={404}
      message="Impossible de trouver la référence recherchée"
    />
  ) : (
    <main className="is-flex is-flex-direction-column is-align-items-center borders">
      {Object.entries(reference).length === 0 ? (
        <Loader />
      ) : (
        <div className="is-flex is-flex-direction-column is-align-items-center reference-content mx-6 borders">
          <button
            className="is-align-self-flex-end send-btn darkblue-bg has-text-white"
            onClick={handleClick}
          >
            Retour
          </button>

          <article className="white-bg borders p-2 reference-content-header">
            <h2 className="reference-content-title has-text-weight-bold has-text-centered mb-6 px-3">
              {reference.name}
            </h2>
            <p className="my-3 reference-content-info">
              <span className="refemi">Date : </span> {reference.date}
            </p>
            <h3 className="my-3 reference-content-info">
              <span className="refemi">Auteur.ice / Réalisateur.ice : </span>{" "}
              {reference.author}
            </h3>
            <p className="my-3 reference-content-info">
              <span className="refemi">Discipline : </span> {reference.field}
            </p>
            <p className="my-3 reference-content-info">
              <span className="refemi">Pays : </span> {reference.country}
            </p>
            <div className="my-3 reference-content-info">
              <span className="refemi">Thèmes :&nbsp;</span>
              {reference.themes &&
                reference.themes
                  .reduce(
                    (unique, item) =>
                      unique.includes(item) ? unique : [...unique, item],
                    []
                  )
                  .map((theme) => (
                    <h4
                      className="has-text-weight-bold pointer darkblue-text"
                      key={uuidv4()}
                      onClick={() =>
                        history.push(
                          `/themes/${theme
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")}`
                        )
                      }
                    >
                      {theme}
                    </h4>
                  ))}
            </div>
          </article>

          {/*           <img src={reference.image} alt={reference.name} /> */}

          <article
            className="reference-content-details white-bg borders  m-6"
            dangerouslySetInnerHTML={{ __html: reference.content }}
          />

          <button
            className="is-align-self-flex-end send-btn darkblue-bg has-text-white"
            onClick={handleClick}
          >
            Retour
          </button>
        </div>
      )}
    </main>
  );
}
