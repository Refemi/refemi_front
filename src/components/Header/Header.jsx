import React from "react";
import { useHistory } from "react-router";
import { VscSearch } from "react-icons/vsc";

// Component
import Navbar from "./Navbar";

// COMPONENT
export default function Header() {
  const history = useHistory();

  return (
    <header className="refemi-navbar is-flex is-justify-content-space-around">
      <span className="logo pointer">
        <span onClick={() => history.push("/categories")} />
        <span onClick={() => history.push("/themes")} />
        <span onClick={() => history.push("/dashboard")} />
        <h1>
          <a href="/" className="refemi">
            refemi
          </a>
        </h1>
      </span>

      <Navbar />
      <VscSearch
        className="icon-navbar is-align-self-center pointer"
        size={20}
        onClick={() => history.push("/search")}
      />
    </header>
  );
}
