import React, { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

// Components
import SearchResult from "../components/SearchBar/SearchResult";

// JS + JSON
import translationKeys from "../utils/translationKeys.json";

// COMPONENT
export default function Search() {
  const frenchKeys = translationKeys[0].french;
  const [search, setSearch] = useState(null);
  const inputSearch = useRef(null);

  return (
    <main className="search is-flex is-flex-direction-column is-align-items-center">
      <h2 className="mt-6 has-text-centered has-text-weight-bold">
        {frenchKeys.searchSentence}
      </h2>

      <fieldset className="is-relative is-flex is-justify-content-center">
        <input
          ref={inputSearch}
          type="text"
          placeholder="Recherche"
          onChange={(e) => setSearch(e.target.value)}
          className="borders form-input search-input my-6"
        />
        <IoIosClose
          className="clearBtn"
          onClick={() => {
            const input = inputSearch;
            input.current.value = null;
            setSearch(null);
          }}
        />
      </fieldset>

      {search !== null && (
        <SearchResult answer={search !== null && search !== "" ? search : ""} />
      )}
    </main>
  );
}
