import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Navbar.css";

import { UserCredentials } from "../../App";

const Navbar = () => {
  const history = useHistory();

  const [dropDown, setDropDown] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { isLoggedIn } = useContext(UserCredentials);

  const showMenu = (e) => {
    e.preventDefault();
    setIsClicked(true);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      e.preventDefault();
      setIsClicked(false);
      document.removeEventListener("click", closeMenu);
    };

    !!dropDown && document.addEventListener("click", closeMenu);
  }, [dropDown]);

  useEffect(() => {
    setDropDown(isClicked);
  }, [isClicked]);

  return (
    <nav className="mb-2 is-flex">
      <ul className="nav-container is-flex">
        <li className="nav-item" style={{ position: "relative" }}>
          <button
            id="dropdown"
            onClick={showMenu}
            className="btn-nav pointer is-uppercase"
          >
            Références
          </button>
          {dropDown && (
            <section style={{ position: "absolute", left: "2vh" }}>
              <button
                className="btn-nav pointer is-uppercase"
                onClick={() => {
                  history.push("/categories");
                  setDropDown(false);
                }}
              >
                Catégories
              </button>

              <button
                className="btn-nav pointer is-uppercase"
                onClick={() => {
                  history.push("/themes");
                  setDropDown(false);
                }}
              >
                Thèmes
              </button>
            </section>
          )}
        </li>

        <li className="nav-item">
          <button
            id="connection"
            onClick={
              !isLoggedIn
                ? () => history.push("/auth/signin")
                : () => history.push("/dashboard")
            }
            className="btn-nav pointer is-uppercase"
          >
            Mon compte
          </button>
        </li>

        <li className="nav-item">
          <button
            id="contact"
            onClick={() => history.push("/contact")}
            className="btn-nav pointer is-uppercase"
          >
            Contact
          </button>
        </li>
        {isLoggedIn && (
          <button
            className="btn pointer is-uppercase"
            onClick={() => history.push("/auth/signout")}
          >
            (Déconnexion)
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
