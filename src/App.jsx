import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import http from "./services/http-common";
import handleResponse from "./utils/handleResponse";
// Views
import Home from "./views/Home";
import Contact from "./views/Contact";
import Connection from "./views/Connection";
import Themes from "./views/Themes";
import Categories from "./views/Categories";
import References from "./views/References";
import RefSheet from "./views/RefSheet";
import Dashboard from "./views/Dashboard";
import Search from "./views/Search";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.css";

// Contexts
export const UserCredentials = createContext();
export const AllSections = createContext();
export const AllThemes = createContext();

// Functions
const getSections = async () => {
  // Get sections to spread in context AllSections
  return await http
    .get(`categories`)
    .then((response) => response.status === 200 && response.data)
    .then((data) => data.categories)
    .catch((error) => {
      // TODO : display the error in a dedicated location
    });
};
const getThemes = async () => {
  // Get themes to spread in context AllThemes
  return await http
    .get(`themes`)
    .then((response) => {
      // TODO see the behavior of this function
      return handleResponse(response, 200);
    })
    .then((data) => data.themes)
    .catch((error) => {
      // TODO : display the error in a dedicated location
    });
};

// COMPONENT
export default function App() {
  const [userCredentials, setUserCredentials] = useState({});
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sections, setSections] = useState([]); // Get sections
  const [themes, setThemes] = useState([]); // Get themes

  useEffect(() => {
    // Get sections and themes from database and save them in state
    const fetchData = async () => {
      setSections(await getSections());
      setThemes(await getThemes());
    };
    fetchData();
  }, [setSections, setThemes]);

  useEffect(() => {
    if (!isLoggedIn) {
      // if user not logged in, get the token and user info from local storage
      const tokenStorage = localStorage.getItem("token");
      // TODO : check if tokenStorage is not exprired
      const userStorage = localStorage.getItem("user");

      if (tokenStorage && userStorage) {
        // if/when token and user info are present in localstorage, save them in state
        setToken(tokenStorage);
        setUserCredentials(JSON.parse(userStorage));
        setIsLoggedIn(true);
      }
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Switch>
        <UserCredentials.Provider
          value={{
            userCredentials,
            setUserCredentials,
            token,
            setToken,
            isLoggedIn,
            setIsLoggedIn,
          }}
        >
          <Header />
          <AllSections.Provider value={{ sections }}>
            <AllThemes.Provider value={{ themes, setThemes }}>
              <Route exact path="/" component={Home} />
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/themes" component={Themes} />
              <Route path="/categories/:categoryName" component={References} />
              <Route path="/themes/:themeName" component={References} />
              <Route exact path="/contact" component={Contact} />
              <Route path="/auth/:sign" component={Connection} />
              {/* TO DO: give proper route name to backend */}
              <Route exact path="/references">
                <Redirect to="/" />
              </Route>
              <Route path="/references/:id" component={RefSheet} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/search" component={Search} />
            </AllThemes.Provider>
          </AllSections.Provider>
        </UserCredentials.Provider>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
