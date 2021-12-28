import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import http from "../../services/http-common";

import "./SearchBar.css";
import "../../css/forms.css";

// Get what user types in search input and format it to be processed by backend
const getSearchInfo = (answer) => {
  let insert = answer.split(" ");
  insert =
    insert.length === 1
      ? (insert = insert.join(""))
      : (insert = insert.join("<->"));

  http.get(`/search?answer=${insert}`).then((res) => res);
};

// COMPONENT
export default function SearchResult({ answer = "" }) {
  const history = useHistory();
  const [searchInfo, setSearchInfo] = useState([]);

  // Waits for the input info to be processed before sending it to state
  useEffect(() => {
    const fetchData = async () => {
      getSearchInfo(await setSearchInfo(getSearchInfo()));
    };

    fetchData();
  }, [answer]);

  return (
    <div className="dataResult">
      {Array.isArray(searchInfo) &&
        searchInfo.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="description-center text-center borders flex justify-between padding2rem line description"
            onClick={() => history.push(`/references/${item.id}`)}
          >
            <div className="reflist-div">{item.reference_name}</div>
            <div className="reflist-div">{item.reference_country_name}</div>
            <div className="align-self-right reflist-div" />
          </div>
        ))}
    </div>
  );
}

SearchResult.propTypes = {
  answer: PropTypes.string.isRequired,
};
