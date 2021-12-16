import React from 'react'
import { useHistory } from 'react-router'

import '../css/references.css'

const ListReferences = list => {
  const history = useHistory()

  return (
    <div>
      <h2 className="margin10" id={list.name}>
        {list.title}
      </h2>

      <div className="description-center text-center borders flex justify-around padding2rem line white-bg margin5">
        <p className="reflist">Nom / Titre</p>
        <p className="reflist">Pays</p>
        <p className="reflist">Thèmes</p>
      </div>

      {list.references
        .sort(() => Math.random() > 0.5 ? 1 : -1)
        .map(reference =>
          <div
            key={reference.id}
            id={reference.id}
            className="description-center text-center borders flex justify-between padding2rem line description white-bg pointer margin5"
            onClick={ () => history.push(`/references/${reference.id}`) }
          >
            <div className="reflist-div">{reference.name}</div>
            <div className="reflist-div">{reference.country}</div>
            <div className="reflist-div scrollbar">
              {reference.themes.map((theme, index) =>
                <p key={index}>{theme}</p>
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ListReferences
