import React from "react";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

// COMPONENT
export default function Footer() {
  return (
    <footer className="p-6 footer">
      <hr />
      <section className="is-flex is-justify-content-space-between ">
        <article className="networks">
          <p className="footer-text">Réseaux</p>

          <div id="network">
            <AiFillFacebook size={48} className="green-grey-text" />
            <AiFillInstagram size={48} className="green-grey-text" />
          </div>
        </article>
        <article>
          <p className="footer-text">Copyrights - 2022</p>
          <ul>
            <li className="footer-text">
              Développé par ©<span className="refemi">refemi</span>
            </li>
          </ul>
        </article>
      </section>
    </footer>
  );
}
