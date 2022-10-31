import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// JS + JSON
import { switchNavigationTo } from "../../utils/switchOptions";

export default function RefSheetHeader({ reference }) {
  const history = useHistory();

  const navigateTo = (path) => {
    return history.push(path);
  };

  return (
    <article className="white-bg p-2 reference-content-header">
      <h2 className="reference-content-title has-text-weight-bold has-text-centered mb-6 px-3 has-text-weight-semibold is-size-3">
        {reference.name}
      </h2>
      <hr />
      <p className="is-size-5 has-text-centered ">{reference.date}</p>

      <h3 className="is-size-5 has-text-centered ">{reference.author}</h3>
      <p className="is-size-5 has-text-centered ">{reference.field}</p>
      <p className="is-size-5 has-text-centered ">{reference.country}</p>
      <div className="is-flex is-justify-content-center">
        {reference.themes &&
          reference.themes
            .reduce(
              (unique, item) =>
                unique.includes(item) ? unique : [...unique, item],
              []
            )
            .map((theme) => (
              <h4
                className="has-text-weight-bold pointer darkblue-text mx-3"
                key={uuidv4()}
                onClick={() =>
                  switchNavigationTo(
                    "themeName",
                    navigateTo,
                    theme
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                  )
                }
              >
                - {theme} -
              </h4>
            ))}
      </div>
    </article>
  );
}

RefSheetHeader.propTypes = {
  reference: PropTypes.object,
};
