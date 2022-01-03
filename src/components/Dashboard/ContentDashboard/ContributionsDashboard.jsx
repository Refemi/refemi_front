import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function ContributionsDashboard({ title, contributions }) {

  return (
    <div className="margin-bottom">
      <p className="dashboard-title">{title}</p>
      {contributions
        .map((contribution) => (
          <article
            key={uuidv4()}
            id={contribution.id}
            className="description-center-reference has-text-center borders is-flex is-justify-content-space-between line m-3"
          >
            <h3 key={uuidv4()} className="reflist-div">{contribution.name}</h3>
            <p key={uuidv4()} className="reflist-div">{contribution.user_name}</p>
            <p key={uuidv4()} className="reflist-div is-hidden-mobile has-text-centered">
              {contribution.country}
            </p>
          </article>
        ))}
      <hr className="m-6" />
    </div>
  );
}
