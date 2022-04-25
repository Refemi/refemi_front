import React from "react";
import { useHistory } from "react-router";
import { VscSearch } from "react-icons/vsc";

// Component
import Navbar from "./Navbar";

// COMPONENT
export default function Header() {
  const history = useHistory();

  return (
    <header className="refemi-navbar is-flex is-justify-content-space-around px-6">
      <picture className="logo pointer">
        <span
          className="logo-square"
          onClick={() => history.push("/categories")}
        />
        <span className="logo-square" onClick={() => history.push("/themes")} />
        <span
          className="logo-square"
          onClick={() => history.push("/dashboard")}
        />
        <h1>
          <a href="/" className="refemi logo-square_link">
            refemi
          </a>
        </h1>
      </picture>

      <Navbar />
      <VscSearch
        className="icon-navbar is-align-self-center pointer"
        size={20}
        onClick={() => history.push("/search")}
      />
    </header>
  );
}
