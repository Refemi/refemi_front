import React, { useState } from 'react'
import PropTypes from 'prop-types'

import '../css/widget.css'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

const WidgetCat = props => {
  const [isShown, setIsShown] = useState(true)

  return (
    <div className="position-relative">
      <div className="widget borders flex">
        <button
          className="show-btn margin5"
          onClick={ () => setIsShown(!isShown) }
        >
          {isShown ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </button>

        {isShown && (
          <div className="flex borders">
            {props.subCategories.map(subCategory =>
              <a
                key={subCategory.id}
                href={`#${subCategory.name}`}
                className="link-no-decoration main-text-color widget-link"
              >
                <button key={subCategory.id} className="widget-btn pointer">
                  {subCategory.label}
                </button>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

WidgetCat.propTypes = {
  subCategories: PropTypes.array.isRequired
}

export default WidgetCat
