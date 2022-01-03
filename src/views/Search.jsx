import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

import "../components/SearchBar/SearchBar.css";

// Components
import SearchResult from "../components/SearchBar/SearchResult";

// COMPONENT
export default function Search() {
  const [search, setSearch] = useState("");

  // get what user typed
  const inputSearch = (e) => setSearch(e.target.value);
  // clear what user typed (for cross in input)
  const clearInput = () => setSearch("");

  // TODO: watch out the cross in the input. It goes everywhere. It needs to be in absolute position relative to a div that has in it just the input and the cross.

  return (
    <main className="search is-flex is-flex-direction-column is-align-items-center">
      <h2 className="mt-6 has-text-centered has-text-weight-bold">
        Tapez votre mot-clé pour trouver la liste des références associées
      </h2>

      <fieldset className="is-relative is-flex is-justify-content-center">
        <input
          type="text"
          placeholder="Recherche"
          value={search}
          onChange={inputSearch}
          className="borders form-input search-input my-6"
        />

        <IoIosClose className="clearBtn" onClick={clearInput} />
      </fieldset>

      {search === "" ? null : <SearchResult answer={search} />}
    </main>
  );
}
