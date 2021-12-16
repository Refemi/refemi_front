import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'

import './SearchBar.css'
import '../../css/forms.css'

const SearchResult = function (props) {
  const history = useHistory()
  const [searchInfo, setSerchinfo] = useState([])

  useEffect(() => {
    let insert = props.answer.split(' ')
    insert =
      insert.length === 1
        ? (insert = insert.join(''))
        : (insert = insert.join('<->'))

    fetch(`http://localhost:8000/search?answer=${insert}`)
      .then(res => res.json())
      .then(res => setSerchinfo(res))
  }, [props.answer])

  return (
    <div className="dataResult">
      {Array.isArray(searchInfo) && searchInfo.map(item =>
        <div
          key={item.id}
          id={item.id}
          className="description-center text-center borders flex justify-between padding2rem line description"
          onClick={() => history.push(`/references/${item.id}`)}
        >
          <div className="reflist-div">{item.reference_name}</div>
          <div className="reflist-div">{item.reference_country_name}</div>
          <div className="align-self-right reflist-div" />
        </div>
      )}
    </div>
  )
}

SearchResult.propTypes = {
  answer: PropTypes.string.isRequired
}

export default SearchResult
