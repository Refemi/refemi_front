import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import http from "../../services/http-common";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";

// Get what user types in search input and format it to be processed by backend
const getSearchInfo = async (answer) => {
  let insert = answer.split(" ");
  insert = insert.length === 1
    ? (insert = insert.join(""))
    : (insert = insert.join("<->"))
  ;

  return await http
    .get(`search?answer=${insert}`)
    .then((result) => {
      if (result.status === 200) {
        return result.data;
      }
    })
    .then(({ search }) => search.sort(() => (Math.random() > 0.5 ? 1 : -1)))
    .catch(() => false);
};

// COMPONENT
export default function SearchResult({ search }) {
  const history = useHistory();
  const [searchResult, setSearchResult] = useState(false);
  // Following states are for pagination
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [currentReferences, setCurrentReferences] = useState([]);
  const [selectedPage] = useState();

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  }

  // Waits for the input info to be processed before sending it to state
  useEffect(() => {
    if (search !== "") {
      if (searchResult !== false) {
        setSearchResult(false);
      }
      
      (async () => {
        const searchResult = await getSearchInfo(search);
        setSearchResult(searchResult !== false ? searchResult : []);
      })();

    } else {
      setSearchResult(false);
    }
  }, [search]);

  useEffect(() => {
    if (searchResult !== false) {
      const paginated = searchResult.slice(offset, offset + perPage);
      setCurrentReferences(paginated)
      setPageCount(Math.ceil(searchResult.length / perPage))  
    }
  }, [offset, searchResult, perPage, setSearchResult]);


  return (
    <section className="dataResult">
      {searchResult === false
        ? search !== ""
          ? <span className="logo-loader pointer">
              <span></span>
              <span></span>
              <span></span>
            </span>
          : null
        : <>
            <h2 className="mb-6 darkblue-text has-text-weight-bold">
              {searchResult.length} résultats trouvés pour votre recherche "{search}" :
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
                  <div className="is-align-self-flex-end reflist-div" />
                </article>
              ))}
            </div>

            {pageCount > 1 && ( 
              <ReactPaginate
                previousLabel={"Précédente"}
                nextLabel={"Suivante"}
                breakLabel={"..."}
                breakClassName={"break-me"}
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
      }
    </section>
  );
}

SearchResult.propTypes = {
  search: PropTypes.string
};

SearchResult.defaultProps = {
  search: ""
}
