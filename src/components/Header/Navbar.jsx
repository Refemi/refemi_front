import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Navbar.css";

import { UserCredentials } from "../../App";

const Navbar = () => {
  const history = useHistory();

  const [dropDown, setDropDown] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { isLogged } = useContext(UserCredentials);

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
    <nav className="margin-bottom5">
      <div className="nav-container">
        <ul>
          <li className="nav-item" style={{ position: "relative" }}>
            <button
              id="dropdown"
              onClick={showMenu}
              className="btn-nav pointer"
            >
              Références
            </button>
            {dropDown && (
              <div style={{ position: "absolute", left: "2vh" }}>
                <button
                  className="btn-nav pointer"
                  onClick={() => {
                    history.push("/categories");
                    setDropDown(false);
                  }}
                >
                  Catégories
                </button>

                <button
                  className="btn-nav pointer"
                  onClick={() => {
                    history.push("/themes");
                    setDropDown(false);
                  }}
                >
                  Thèmes
                </button>
              </div>
            )}
          </li>

          <li className="nav-item">
            <button
              id="connection"
              onClick={() => history.push("/auth/:signin")}
              className="btn-nav pointer"
            >
              Mon compte
            </button>
          </li>

          <li className="nav-item">
            <button
              id="contact"
              onClick={() => history.push("/contact")}
              className="btn-nav pointer"
            >
              Contact
            </button>
          </li>
          {isLogged && (
            <button
              className="btn pointer"
              onClick={() => history.push("/auth/signout")}
            >
              (Déconnexion)
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
