import React from 'react'

import '../../css/themes.css'

export default function Button (label = '', path = null) {
  return (
    <button
      className="margin-top10 margin-end10 pointer send-btn darkblue-bg text-white align-self-right"
      onClick={ path !== null && ( () => history.push(path)) }
    >
      {label}
    </button>
  )
}