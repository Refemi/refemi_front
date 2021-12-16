import React, { useState } from 'react'
import SearchResult from './SearchResult'

import './SearchBar.css'

import { IoIosClose } from 'react-icons/io'

const Search = () => {
  const [search, setSearch] = useState('')

  const inputSearch = e => setSearch(e.target.value)
  const clearInput = () => setSearch('')

  return (
    <div className="search margin-top20 flex flex-column align-center">
      <p className="margin-top">
        Tapez votre mot-clé pour trouver la liste des références associées
      </p>

      <input
        type="text"
        placeholder="Recherche"
        value={search}
        onChange={inputSearch}
        className="borders form-input width80 margin10"
      />

      <IoIosClose className="clearBtn" onClick={clearInput} />

      { search === '' ? null : <SearchResult answer={search} /> }
    </div>
  )
}

export default Search
