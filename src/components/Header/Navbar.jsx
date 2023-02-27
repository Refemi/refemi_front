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
import { switchNavigationTo } from "../../utils/switchOptions";

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

  const navigateTo = (path) => {
    // In any case, disable the toggle if one of the elements is required
    !!toggleMenu && setToggleMenu(false);
    history.push(path);
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
                onClick={() => switchNavigationTo("categories", navigateTo)}
                label={frenchKeys.categories}
              />

              <MenuButton
                className="btn-nav pointer is-uppercase"
                onClick={() => switchNavigationTo("themes", navigateTo)}
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
                ? () => switchNavigationTo("signIn", navigateTo)
                : () => switchNavigationTo("dashboard", navigateTo)
            }
            className="btn-nav pointer is-uppercase"
          >
            Compte
          </button>
        </li>

        <li className="nav-item">
          <button
            id="contact"
            onClick={() => switchNavigationTo("contact", navigateTo)}
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
              onClick={() => switchNavigationTo("signOut", navigateTo)}
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
