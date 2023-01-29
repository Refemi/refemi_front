import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function Theme(props) {
  return (
    <span className="is-flex is-flex-wrap-wrap">
      {props.authors.map((author, index) => (
        <h4 className="has-text-centered" key={uuidv4()}>
          {(index ? ", " : "") + author}
        </h4>
      ))}
    </span>
  );
}
