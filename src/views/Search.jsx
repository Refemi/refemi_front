import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'

import '../components/SearchBar/SearchBar.css'

// Components
import SearchResult from '../components/SearchBar/SearchResult'

// COMPONENT
export default function Search () {
  const [search, setSearch] = useState('')

  // get what user typed
  const inputSearch = e => setSearch(e.target.value)
  // clear what user typed (for cross in input)
  const clearInput = () => setSearch('')

  // TODO: watch out the cross in the input. It goes everywhere. It needs to be in absolute position relative to a div that has in it just the input and the cross.

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
