import React from 'react'

import '../css/counter.css'

const Counter = counter =>
  <div className="box justify-center align-center">
    <p className="text-center number-counters">{counter.value}</p>
    {counter.label && (
      <p className="box-legend text-center">{counter.label}</p>
    )}
  </div>

export default Counter
