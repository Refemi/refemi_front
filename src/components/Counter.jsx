import React from 'react'

import '../css/counter.css'

// COMPONENT
export default function Counter({ label = '', value = ''}) {
  return(
    <div className="box justify-center align-center">
      <p className="text-center number-counters">{value}</p>
      {label
        ? <p className="box-legend text-center">{label}</p>
        : null
      }
    </div>
  )
}
