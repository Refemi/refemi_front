import React from "react";
import { useHistory } from "react-router";

import "../css/references.css";

// COMPONENT
export default function ListReferences({
  name = "",
  title = "",
  references = [],
}) {
  const history = useHistory();

  return (
    <section className="position-relative">
      <h2 className="m-6" id={name}>
        {title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ")}{" "}
        {/* Making sure that we show the correct format: in the liste references of themes it is necessary maybe to be changed if we find a better way */}
      </h2>

      <article className="description-center text-center borders flex is-justify-content-space-around padding2rem line white-bg margin5">
        <p className="reflist">Nom / Titre</p>
        <p className="reflist">Pays</p>
        <p className="reflist">Thèmes</p>
      </article>

      {references
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .map((reference) => (
          <article
            key={reference.id}
            id={reference.id}
            className="description-center text-center borders flex is-justify-content-space-between padding2rem line description white-bg pointer margin5"
            onClick={() => history.push(`/references/${reference.id}`)}
          >
            <h3 className="reflist-div">{reference.name}</h3>
            <p className="reflist-div">{reference.country}</p>
            <span className="reflist-div scrollbar">
              {reference.themes.map((theme, index) => (
                <h4 key={index}>{theme}</h4>
              ))}
            </span>
          </article>
        ))}
    </section>
  );
}
