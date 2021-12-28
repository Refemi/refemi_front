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
    <div>
      <h2 className="margin10" id={name}>
        {title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ")}{" "}
        {/* Making sure that we show the correct format: in the liste references of themes it is necessary maybe to be changed if we find a better way */}
      </h2>

      <div className="description-center text-center borders flex justify-around padding2rem line white-bg margin5">
        <p className="reflist">Nom / Titre</p>
        <p className="reflist">Pays</p>
        <p className="reflist">Thèmes</p>
      </div>

      {references
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .map((reference) => (
          <div
            key={reference.id}
            id={reference.id}
            className="description-center text-center borders flex justify-between padding2rem line description white-bg pointer margin5"
            onClick={() => history.push(`/references/${reference.id}`)}
          >
            <div className="reflist-div">{reference.name}</div>
            <div className="reflist-div">{reference.country}</div>
            <div className="reflist-div scrollbar">
              {reference.themes.map((theme, index) => (
                <p key={index}>{theme}</p>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
