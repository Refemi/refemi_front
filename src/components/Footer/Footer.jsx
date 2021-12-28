import React from 'react'
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai'

import './Footer.css'

// COMPONENT
export default function Footer () {
  return (
      <footer className="flex justify-around margin20">
      <hr />
        <section>
          <h4>Réseaux</h4>

          <article id="network">
            <AiFillFacebook size={48} className="color" />
            <AiFillInstagram size={48} className="color" />
          </article>
        </section>
        <section>
          <h4>Copyrights</h4>
          <ul>
            <li>
              Développé par <span className="refemi">refemi</span>
            </li>
          </ul>
        </section>
      </footer>
  )
}
