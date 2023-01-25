import React, { useContext,useEffect,useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

// Import Contexts
import { DataContext, UserContext } from "../../../App";
import { MainContext } from "./MainDashboard";

// Import globals
import roles from "../../../utils/roles";   
import { switchIcon } from "../../../utils/switchOptions";

export default function ContributionsDashboard({ title, contributions }) {
  const history = useHistory();
  const { userCredentials } = useContext(UserContext);
  const { sections, categories } = useContext(DataContext);
  const { setEditContribution } = useContext(MainContext);
  // Following states are for pagination
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(7);
  const [pageCount, setPageCount] = useState(0);
  const [currentReferences, setCurrentReferences] = useState([]);
  const [selectedPage] = useState();

   const paginateReferences = () => {
    const paginated = contributions.slice(offset, offset + perPage);
    setCurrentReferences(paginated);
    setPageCount(Math.ceil(contributions.length / perPage));
  };
  
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  useEffect(() => {
    paginateReferences();
  }, [offset]);
 
  return (
    <section className="margin-bottom">
      {sections.length > 0 && categories.length > 0 &&  (  
        
        <article>
         <h2 className=" is-uppercase has-text-weight-bold ">
            {title}
         </h2>
          {currentReferences &&
            currentReferences
              .sort((a, b) => {
                if (a.status) {
                  return a.category - b.category;
                } else {
                  return a.contributor - b.user_name;
                }
              })
              .map((contribution) => (
                <article
                  key={contribution.id}
                  id={contribution.id}
                  className="description-center-reference borders is-flex is-justify-content-space-between line m-3 p-3"
                  onClick={() => {
                    if (contribution.status) {
                      if (userCredentials.role !== roles.ADMIN) {
                        setEditContribution(contribution);
                      } else {
                        history.push(`/references/${contribution.id}`);
                      }
                    } else {
                       history.push(`/references/${contribution.id}`);;
                    }
                  }}
                >
                  <p className="reflist-div is-inline-flex">
                    {
                      // Retrieving the name of the section of the category
                      sections.length > 0 &&
                        categories &&
                        switchIcon(
                          sections.filter(
                            (section) =>
                              categories.find(
                                (category) =>
                                  contribution.category_id === category.id
                              ).section_id === section.id
                          )[0].label
                        )
                    }
                  </p>
                  <p className="reflist-div">{contribution.name}</p>
                  <p className="reflist-div">{contribution.user_name}</p>
                </article>
              ))}
          <hr className="m-6" />
        </article>
      )}
      {/* paginatation */}
       <section className="pagination-margin-bottom">
       {pageCount > 1 ? (
        <ReactPaginate
          previousLabel={"Précédente"}
          pageCount={pageCount}
          nextLabel={"Suivante"}
          breakLabel={"..."}
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
      <hr className="m-6" />
        </section>
    </section>
  );
}

ContributionsDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  contributions: PropTypes.array.isRequired,
};
