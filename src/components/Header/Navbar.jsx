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
  const [isToggled, setIsToggled] = useState(false);
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
    !!dropDown && document.addEventListener("click", closeMenu);
  }, [dropDown]);

  useEffect(() => {
    const navToggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-container");
    navToggle.addEventListener("click", () => {
      links.classList.toggle("show-links");
    });
  }, [isToggled]);

  useEffect(() => {
    setDropDown(isClicked);
  }, [isClicked]);

  return (
    <nav className="nav-center is-relative">
      <button className="nav-toggle" onClick={() => setIsToggled(!isToggled)}>
        <BsList size={50} />
      </button>

      <ul className="nav-container">
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
              style={{ position: "absolute" }}
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
