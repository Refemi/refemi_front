import React from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function RefSheetHeader(props) {
  const history = useHistory();
  const reference = props.reference;

  return (
    <>
      <h2 className="reference-content-title has-text-weight-bold has-text-centered mb-6 px-3 has-text-weight-semibold is-size-3">
        {reference.name}
      </h2>
      <hr />
      <p className="my-3 reference-content-info is-size-5 has-text-centered ">
        {reference.date}
      </p>

      <h3 className="my-3 reference-content-info is-size-5 has-text-centered ">
        {reference.author}
      </h3>
      <p className="my-3 reference-content-info is-size-5 has-text-centered ">
        {reference.field}
      </p>
      <p className="my-3 reference-content-info is-size-5 has-text-centered ">
        {reference.country}
      </p>
      <div className="my-3 reference-content-info is-flex is-justify-content-center">
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
                  history.push(
                    `/themes/${theme
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")}`
                  )
                }
              >
                - {theme} -
              </h4>
            ))}
      </div>
    </>
  );
}
