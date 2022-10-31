import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import http from "../../services/http-common";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";

// Import components
import Loader from "../Loader";
import ListReferences from "../References/ListReferences";

// JS + JSON
import translationKeys from "../../utils/translationKeys.json";
import {
  getReferencesFromSearch,
  findCategories,
} from "../../services/getData";

export default function SearchResult({ answer }) {
  const frenchKeys = translationKeys[0].french;
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
  const updateSearch = async () => {
    const searchResult = await getReferencesFromSearch(answer);
    return setSearchResult(searchResult !== false ? searchResult : []);
  };

  useEffect(() => {
    if (answer !== "") {
      if (searchResult !== false) {
        setSearchResult(false);
      }
      updateSearch();
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
  }, [currentReferences]);

  return (
    <section className="dataResult">
      {searchResult === false ? (
        answer !== "" ? (
          <Loader />
        ) : null
      ) : (
        <article>
          <h2 className="mb-6 darkblue-text has-text-weight-bold">
            {searchResult != 0 && searchResult.length} {frenchKeys.foundResults}{" "}
            "{answer}" :
          </h2>

          {categories.map(
            (category) =>
              currentReferences.filter(
                (reference) => reference.category === category
              ).length > 0 && (
                <ListReferences
                  key={uuidv4()}
                  title={category.label}
                  name={category.name}
                  references={currentReferences.filter(
                    (reference) => reference.category === category
                  )}
                  clearReferences={() => {
                    setCurrentReferences([]);
                  }}
                />
              )
          )}

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
        </article>
      )}
    </section>
  );
}

SearchResult.propTypes = {
  answer: PropTypes.string,
};

SearchResult.defaultProps = {
  answer: "",
};
