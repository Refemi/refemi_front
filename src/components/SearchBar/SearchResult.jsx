import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import http from "../../services/http-common";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";

// Import components
import Loader from "../Loader";
import ListReferences from "../References/ListReferences";

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

  console.log(categories);

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
