import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";

// Import Components
import ListReferencesHeader from "./ListReferencesHeader";

// Import Contexts
import { DataContext } from "../../App";

export default function ListReferences({
  name = "",
  title = "",
  references = [],
  clearReferences = () => {},
}) {
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [currentReferences, setCurrentReferences] = useState([]);
  const [selectedPage] = useState();
  const { themes } = useContext(DataContext);

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

  const history = useHistory();

  return (
    <section>
      <h2 className="m-6 category-title is-uppercase" id={name}>
        {title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ")}{" "}
        {/* Making sure that we show the correct format: in the liste references of themes it is necessary maybe to be changed if we find a better way */}
      </h2>

      <ListReferencesHeader />

      <section className="mb-6">
        {currentReferences.map((reference) => (
          <article
            key={uuidv4()}
            id={reference.id}
            className="description-center-reference has-text-center borders is-flex is-justify-content-space-between line m-3"
          >
            <h3
              className="reflist-div pointer"
              onClick={() => history.push(`/references/${reference.id}`)}
            >
              {reference.name}
            </h3>
            <p className="reflist-div has-text-centered">{reference.author}</p>
            <p className="reflist-div is-hidden-mobile has-text-centered">
              {reference.country}
            </p>
            {reference.themes ? (
              <span className="reflist-div scrollbar is-hidden-mobile is-flex is-flex-wrap-wrap is-justify-content-end">
                {reference.themes
                  .reduce(
                    (unique, item) =>
                      unique.includes(item) ? unique : [...unique, item],
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
