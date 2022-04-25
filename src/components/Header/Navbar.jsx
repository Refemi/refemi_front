import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BsList } from "react-icons/bs";

// Context
import { UserContext } from "../../App";

// COMPONENT
const Navbar = () => {
  const history = useHistory();

  const [dropDown, setDropDown] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isLoggedIn } = useContext(UserContext);

  const showDropDownMenu = () => {
    const closeMenu = (e) => {
      e.preventDefault();
      setDropDown(false);
      document.removeEventListener("click", closeMenu);
    };

    document.addEventListener("click", closeMenu)
  }
  const showToggleMenu = () => {
    const closeToggle = (e) => {
      e.preventDefault();
      setToggleMenu(false)
      document.removeEventListener("click", closeToggle);
    };

    document.addEventListener("click", (e) => {
      // Do not close the panel if you click inside
      if (!e.path.find(p => p.localName === 'header')) {
        closeToggle(e);
      }
    })
  }

  const pushHistory = (location) => {
    switch (location) {
      // Disable dropdown when click on one of the items below
      case 'categories':
      case 'themes':
        setDropDown(false)
      default:
        // In any case, disable the toggle if one of the elements is required
        !!toggleMenu && setToggleMenu(false);
        history.push(location)
    }
  }
  
  useEffect(() => {
    !!dropDown && showDropDownMenu();
  }, [dropDown]);
  useEffect(() => {
    !!toggleMenu && showToggleMenu();
  }, [toggleMenu]);


  return (
    <nav className="nav">
      <button className={`nav-toggle ${!!toggleMenu && 'show-toggle'}`} onClick={() => setToggleMenu(!toggleMenu)}>
        <BsList size={50} />
      </button>

      <ul className={`nav-container ${toggleMenu && 'show-links'}`}>
        <li className="nav-item">
          <button
            id="dropdown"
            onClick={() => setDropDown(!dropDown)}
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
                onClick={() => pushHistory('/categories')}
              >
                Catégories
              </button>

              <button
                className="btn-nav pointer is-uppercase"
                onClick={() => pushHistory('/themes')}
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
                ? () => pushHistory('/auth/signin')
                : () => pushHistory('/dashboard')
            }
            className="btn-nav pointer is-uppercase"
          >
            Mon compte
          </button>
        </li>

        <li className="nav-item">
          <button
            id="contact"
            onClick={() => pushHistory('/contact') }
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
              onClick={() => pushHistory('/auth/signout')}
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
