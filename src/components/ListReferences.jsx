import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

// COMPONENT
export default function ListReferences({
  name = "",
  title = "",
  references = [],
}) {
  const history = useHistory();

  return (
    <section>
      <h2 className="m-6 category-title is-uppercase" id={name}>
        {title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ")}{" "}
        {/* Making sure that we show the correct format: in the liste references of themes it is necessary maybe to be changed if we find a better way */}
      </h2>

      <article className="description-center has-text-center borders is-flex is-justify-content-space-between p-5 line white-bg m-3">
        <p className="reflist">Nom / Titre</p>
        <p className="reflist is-hidden-mobile">Pays</p>
        <p className="reflist is-hidden-mobile">Thèmes</p>
      </article>

      {references
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .map((reference) => (
          <article
            key={uuidv4()}
            id={reference.id}
            className="description-center-reference has-text-center borders is-flex is-justify-content-space-between line m-3"
            onClick={() => history.push(`/references/${reference.id}`)}
          >
            <h3 className="reflist-div">{reference.name}</h3>
            <p className="reflist-div is-hidden-mobile has-text-centered">
              {reference.country}
            </p>
            {reference.themes ? (
              <span className="reflist-div scrollbar is-hidden-mobile is-flex is-flex-wrap-wrap is-justify-content-end">
                {reference.themes.map((theme) => (
                  <h4 className="ml-4" key={uuidv4()}>
                    {theme}
                  </h4>
                ))}
              </span>
            ) : null}
          </article>
        ))}
    </section>
  );
}
