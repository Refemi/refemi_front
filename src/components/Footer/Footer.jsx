import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

const FACEBOOK_PROFILE =
  "https://www.facebook.com/profile.php?id=100090276189643";
const INSTAGRAM_PROFILE = "https://www.instagram.com/refemi__/";

// COMPONENT
export default function Footer() {
  let history = useHistory();
  const goTo = (link) => {
    history.push(link);
  };
  useEffect(() => {
    const date = document.getElementById("date");
    date.innerHTML = new Date().getFullYear();
  });

  return (
    <footer className="px-6 footer">
      <hr />
      <section className="is-flex is-justify-content-space-between ">
        <article className="networks">
          <p className="footer-text">Réseaux</p>

          <div id="network">
            <a href={FACEBOOK_PROFILE} target="_blank">
              <AiFillFacebook size={48} className="green-grey-text" />
            </a>
            <a href={INSTAGRAM_PROFILE} target="_blank">
              <AiFillInstagram size={48} className="green-grey-text" />
            </a>
          </div>
        </article>
        <article>
          <p className="footer-text">
            Copyrights - <span id="date">2022</span>
          </p>
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
