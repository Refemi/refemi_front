import React from 'react'
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai'

import './Footer.css'

// COMPONENT
export default function Footer () {
  return (
    <>
      <hr className="margin20" />
      <footer className="flex justify-around">
        <div>
          <h5>Réseaux</h5>

          <div id="network">
            <AiFillFacebook size={48} className="color" />
            <AiFillInstagram size={48} className="color" />
          </div>
        </div>
        <div>
          <h5>Copyrights</h5>
          <ul>
            <li>
              Développé par <span className="refemi">refemi</span>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}
