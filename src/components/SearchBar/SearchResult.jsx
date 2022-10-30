import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import http from "../../services/http-common";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";

import Loader from "../Loader";

// Get what user types in searchReferences input and format it to be processed by backend
const getSearchReferences = async (answer, setSearchReferences) => {
  let insert = answer.split(" ");
  insert =
    insert.length === 1
      ? (insert = insert.join(""))
      : (insert = insert.join("<->"));

  return await http()
    .get(`search/?answer=${insert}`)
    .then((result) => {
      if (result.status === 200) {
        return result.data;
      }
    })
    .then(({ search }) => search.sort(() => (Math.random() > 0.5 ? 1 : -1)))
    .catch(() => false);
};

const findCategories = (references) => {
  const categories = references.reduce(
    (categories, reference) => {
      if (!categories.includes(reference.category)) {
        categories.push(reference.category);
      }
      return categories;
    },
    [""]
  );
  categories.shift();
  return categories;
};
export default function SearchResult({ answer = "" }) {
  const history = useHistory();
  const [searchResult, setSearchResult] = useState(false);
  // Following states are for pagination
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [currentReferences, setCurrentReferences] = useState([]);
  const [selectedPage] = useState();
  const [categories, setCategories] = useState([]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  // Waits for the input info to be processed before sending it to state
  useEffect(() => {
    if (answer !== "") {
      if (searchResult !== false) {
        setSearchResult(false);
      }

      (async () => {
        const searchResult = await getSearchReferences(answer);
        setSearchResult(searchResult !== false ? searchResult : []);
      })();
    } else {
      setSearchResult(false);
    }
  }, [answer]);

  useEffect(() => {
    if (searchResult !== false) {
      const paginated = searchResult.slice(offset, offset + perPage);
      setCurrentReferences(paginated);
      setPageCount(Math.ceil(searchResult.length / perPage));
    }
  }, [offset, searchResult, perPage, setSearchResult]);

  useEffect(() => {
    if (currentReferences) {
      setCategories(findCategories(currentReferences));
    }
    console.log(currentReferences);
  }, [currentReferences]);

  return (
    <section className="dataResult">
      {searchResult === false ? (
        answer !== "" ? (
          <Loader />
        ) : null
      ) : (
        <>
          <h2 className="mb-6 darkblue-text has-text-weight-bold">
            {searchResult != 0 && searchResult.length} résultats trouvés pour
            votre recherche "{answer}" :
          </h2>
          <div className="mb-6">
            {currentReferences.map((item) => (
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
                <p>{item.author}</p>
                {item.themes ? (
                  <span className="reflist-div scrollbar is-hidden-mobile is-flex is-flex-wrap-wrap is-justify-content-end">
                    {item.themes
                      .reduce(
                        (unique, theme) =>
                          unique.includes(theme) ? unique : [...unique, theme],
                        []
                      )
                      .map((theme) => (
                        <h4
                          className="ml-4 has-text-weight-bold pointer darkblue-text clickable"
                          key={uuidv4()}
                          onClick={() => {
                            clearReferences();
                            history.push(
                              `/themes/${theme
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")}`
                            );
                          }}
                        >
                          {theme}
                        </h4>
                      ))}
                  </span>
                ) : null}
              </article>
            ))}
          </div>

          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"Précédente"}
              nextLabel={"Suivante"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              previousClassName={"pagination-previous"}
              nextClassName={"pagination-next"}
              forcePage={selectedPage}
              breakClassName={"pagination-ellipsis"}
              pageClassName={"pagination-link"}
              hrefAllControls={true}
            />
          )}
        </>
      )}
    </section>
  );
}

SearchResult.propTypes = {
  search: PropTypes.string,
};

SearchResult.defaultProps = {
  search: "",
};
