import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import http from "../../services/http-common";
import { v4 as uuidv4 } from "uuid";

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

  useEffect(() => {
    console.log(searchInfo);
  }, [searchInfo]);

  return (
    <section className="dataResult">
      {Array.isArray(searchInfo) && (
        <div>
          <h2 className="mb-6 darkblue-text has-text-weight-bold">
            {searchInfo.length} résultats trouvés pour votre recherche "{answer}
            " :
          </h2>
          {searchInfo.map((item) => (
            <article
              key={uuidv4()}
              id={item.id}
              className="description-center-reference has-text-center borders is-flex is-justify-content-space-between line m-3"
              onClick={() => history.push(`/references/${item.id}`)}
            >
              <h3 className="reflist-div">{item.reference_name}</h3>
              <p className="reflist-div is-hidden-mobile has-text-centered">
                {item.reference_country_name}
              </p>
              <div className="is-align-self-flex-end reflist-div" />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

SearchResult.propTypes = {
  answer: PropTypes.string.isRequired,
};
