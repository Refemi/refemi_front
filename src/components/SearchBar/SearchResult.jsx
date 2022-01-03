import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import http from "../../services/http-common";

// Get what user types in search input and format it to be processed by backend
const getSearchInfo = async (answer) => {
  let insert = answer.split(" ");
  insert =
    insert.length === 1
      ? (insert = insert.join(""))
      : (insert = insert.join("<->"));

  return await http
    .get(`search?answer=${insert}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .then((data) => data.search);
};

// COMPONENT
export default function SearchResult({ answer = "" }) {
  const history = useHistory();
  const [searchInfo, setSearchInfo] = useState([]);

  // Waits for the input info to be processed before sending it to state
  useEffect(() => {
    const fetchData = async () => {
      setSearchInfo(await getSearchInfo(answer));
    };

    fetchData();
  }, [answer]);

  return (
    <section className="dataResult">
      {Array.isArray(searchInfo) &&
        searchInfo.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="description-center has-text-center borders is-flex is-justify-content-space-between line description"
            onClick={() => history.push(`/references/${item.id}`)}
          >
            <div className="reflist-div">{item.reference_name}</div>
            <div className="reflist-div">{item.reference_country_name}</div>
            <div className="is-align-self-flex-end reflist-div" />
          </article>
        ))}
    </section>
  );
}

SearchResult.propTypes = {
  answer: PropTypes.string.isRequired,
};
