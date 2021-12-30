import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import http from "../services/http-common";
import "../css/refsheet.css";

const getReferenceById = (id) => {
  return http
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
    <div className="flex is-flex-direction-column is-align-items-center grey-opacity borders margin30">
      <button
        className="is-align-self-flex-end send-btn darkblue-bg text-white"
        onClick={handleClick}
      >
        Retour
      </button>

      <div className="dashboard-content white-bg borders width80 margin10">
        <p className="reference-detail">
          <span className="refemi">Nom :</span> {reference.name}
        </p>
        <p className="reference-detail">Date :{reference.date}</p>
        <p className="reference-detail">
          Auteur.ice / Réalisateur.ice : {reference.author}
        </p>
        <p className="reference-detail">Discipline :{reference.field}</p>
        <p className="reference-detail">Pays :{reference.country}</p>
        <p className="reference-detail">
          Thèmes :&nbsp;
          {reference.themes &&
            reference.themes.map((theme) => <p key={theme.id}>{theme}</p>)}
        </p>
      </div>

      <img src={reference.image} alt={reference.name} />

      <div
        className="dashboard-content white-bg borders width80 margin10"
        dangerouslySetInnerHTML={{ __html: reference.content }}
      />

      <button
        className="is-align-self-flex-end send-btn darkblue-bg text-white"
        onClick={handleClick}
      >
        Retour
      </button>
    </div>
  );
}
