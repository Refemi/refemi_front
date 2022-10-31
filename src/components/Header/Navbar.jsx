import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BsList } from "react-icons/bs";

// Context
import { UserContext } from "../../App";
import { HeaderContext } from "./Header";

// Components
import MenuButton from "../Buttons/MenuButton";

// JS + JSON
import translationKeys from "../../utils/translationKeys.json";

// COMPONENT
const Navbar = () => {
  const history = useHistory();
  const frenchKeys = translationKeys[0].french;

  const [dropDown, setDropDown] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const { toggleMenu, setToggleMenu } = useContext(HeaderContext);
  const showDropDownMenu = () => {
    const closeMenu = (e) => {
      e.preventDefault();
      setDropDown(false);
      document.removeEventListener("click", closeMenu);
    };

    document.addEventListener("click", closeMenu);
  };

  const pushHistory = (location) => {
    switch (location) {
      // Disable dropdown when click on one of the items below
      case "categories":
      case "themes":
        setDropDown(false);
      default:
        // In any case, disable the toggle if one of the elements is required
        !!toggleMenu && setToggleMenu(false);
        history.push(location);
    }
  };

  useEffect(() => {
    !!dropDown && showDropDownMenu();
  }, [dropDown]);

  return (
    <nav className="nav">
      <button
        className={`nav-toggle ${!!toggleMenu && "show-toggle"}`}
        onClick={() => setToggleMenu(!toggleMenu)}
      >
        <BsList size={50} />
      </button>

      <ul className={`nav-container ${toggleMenu && "show-links"}`}>
        <li className="nav-item">
          <MenuButton
            id="dropdown"
            onClick={() => setDropDown(!dropDown)}
            className="dropdown-btn btn-nav pointer is-uppercase"
            label={frenchKeys.references}
          />
          {dropDown && (
            <section className="dropdown-items">
              <MenuButton
                className="btn-nav pointer is-uppercase"
                onClick={() => pushHistory("/categories")}
                label={frenchKeys.categories}
              />

              <MenuButton
                className="btn-nav pointer is-uppercase"
                onClick={() => pushHistory("/themes")}
                label={frenchKeys.themes}
              />
            </section>
          )}
        </li>

        <li className="nav-item">
          <button
            id="connection"
            onClick={
              !isLoggedIn
                ? () => pushHistory("/auth/signin")
                : () => pushHistory("/dashboard")
            }
            className="btn-nav pointer is-uppercase"
          >
            Compte
          </button>
        </li>

        <li className="nav-item">
          <button
            id="contact"
            onClick={() => pushHistory("/contact")}
            className="btn-nav pointer is-uppercase"
          >
            Contact
          </button>
        </li>
        {isLoggedIn && (
          <li className="nav-item">
            <button
              id="signout"
              className="btn-nav pointer is-uppercase"
              onClick={() => pushHistory("/auth/signout")}
            >
              (Déconnexion)
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
