import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BsList } from "react-icons/bs";

// Context
import { UserContext } from "../../App";

// COMPONENT
const Navbar = () => {
  const history = useHistory();

  const [dropDown, setDropDown] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isLoggedIn } = useContext(UserContext);

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

    !!dropDown || !!toggleMenu  && document.addEventListener("click", closeMenu);
  }, [dropDown]);

  useEffect(() => {
    const closeMenu = (e) => {
      e.preventDefault();
      setIsClicked(false);
      document.removeEventListener("click", closeMenu);
    };

    !!toggleMenu && document.addEventListener("click", closeMenu);
  }, [toggleMenu]);

  useEffect(() => {
    setDropDown(isClicked);
    setToggleMenu(isClicked);
  }, [isClicked]);

  return (
    <nav className="nav">
      <button className={`nav-toggle ${toggleMenu && ''}`} onClick={() => setToggleMenu(!toggleMenu)}>
        <BsList size={50} />
      </button>

      <ul className={`nav-container ${toggleMenu && 'show-links'}`}>
        <li className="nav-item">
          <button
            id="dropdown"
            onClick={showMenu}
            className="dropdown-btn btn-nav pointer is-uppercase"
          >
            Références
          </button>
          {dropDown && (
            <section
              className="dropdown-items"
            >
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
            className="btn-nav pointer is-uppercase"
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
