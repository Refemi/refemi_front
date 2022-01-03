import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import http from "../services/http-common";
import { v4 as uuidv4 } from "uuid";

const getReferenceById = async (id) => {
  return await http
    .get(`/references/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data.reference[0]);
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

  return (
    <main className="is-flex is-flex-direction-column is-align-items-center borders">
      <div className="is-flex is-flex-direction-column is-align-items-center grey-bg-opacity reference-content p-6 mx-6 mt-6 borders">
        <button
          className="is-align-self-flex-end send-btn darkblue-bg has-text-white"
          onClick={handleClick}
        >
          Retour
        </button>

        <article className="white-bg borders m-6 p-2 reference-header">
          <h2 className="reference-detail has-text-weight-bold has-text-centered is-size-3 mb-6">
            {reference.name}
          </h2>
          <p className="my-3 ml-6">
            <span className="refemi">Date : </span> {reference.date}
          </p>
          <h3 className="my-3 ml-6">
            <span className="refemi">Auteur.ice / Réalisateur.ice : </span>{" "}
            {reference.author}
          </h3>
          <p className="my-3 ml-6">
            <span className="refemi">Discipline : </span> {reference.field}
          </p>
          <p className="my-3 ml-6">
            <span className="refemi">Pays : </span> {reference.country}
          </p>
          <div className="my-3 ml-6">
            <span className="refemi">Thèmes :&nbsp;</span>
            {reference.themes &&
              reference.themes.map((theme) => (
                <h4 className="has-text-weight-bold" key={uuidv4()}>
                  {theme}
                </h4>
              ))}
          </div>
        </article>

        <img src={reference.image} alt={reference.name} />

        <div
          className="reference-details dashboard-content white-bg borders  m-6"
          dangerouslySetInnerHTML={{ __html: reference.content }}
        />

        <button
          className="is-align-self-flex-end send-btn darkblue-bg has-text-white"
          onClick={handleClick}
        >
          Retour
        </button>
      </div>
    </main>
  );
}
