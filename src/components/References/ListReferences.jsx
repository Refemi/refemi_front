import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

// Import Components
import ListReferencesHeader from "./ListReferencesHeader";
import Theme from "../Theme";
import Author from "../Author";

export default function ListReferences({
  name,
  title,
  references,
  clearReferences,
}) {
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [currentReferences, setCurrentReferences] = useState([]);
  const [selectedPage] = useState();

  const history = useHistory();

  // paginate references
  const paginateReferences = () => {
    const paginated = references.slice(offset, offset + perPage);
    setCurrentReferences(paginated);
    setPageCount(Math.ceil(references.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    paginateReferences();
  }, [offset]);

  return (
    <section>
      <h2 className="m-6 category-title is-uppercase" id={name}>
        {title}
      </h2>

      <ListReferencesHeader />

      <section className="mb-6">
        {currentReferences.map((reference) => (
          <article
            key={uuidv4()}
            id={reference.id}
            className="description-center-reference has-text-center borders is-flex is-justify-content-space-between line m-3 pointer"
            onClick={() => history.push(`/references/${reference.id}`)}
          >
            <h3
              className="reflist reflist-div pointer"
              onClick={() => history.push(`/references/${reference.id}`)}
            >
              {reference.name}
            </h3>
            {reference.author ? <Author authors={reference.author} /> : null}
            <p className="reflist-div is-hidden-mobile has-text-centered">
              {reference.country}
            </p>
            {reference.themes ? <Theme themes={reference.themes} /> : null}
          </article>
        ))}
      </section>
      {pageCount > 1 ? (
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
      ) : null}

      <hr />
    </section>
  );
}

ListReferences.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  references: PropTypes.array,
  clearReferences: PropTypes.func,
};
