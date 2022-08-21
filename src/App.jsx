import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

// JS
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
import LoggedOut from "./views/LoggedOut";
import FormSent from "./views/FormSent";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// CSS
import "./styles/css/style.css";
import "bulma/css/bulma.min.css";
import AddReference from "./components/Dashboard/FormDashboard/AddReference";
import FormReference from "./components/Dashboard/FormDashboard/FormReference";

// Contexts
export const UserContext = createContext();
export const DataContext = createContext();

// Functions
const getSections = async () => {
  // Get sections to spread in context SectionsContext
  return await http()
    .get(`sections`)
    .then((response) => response.status === 200 && response.data)
    .then((data) => {
      return data.sections;
    })
    .catch((error) => {
      // TODO : display the error in a dedicated location
    });
};
const getCategories = async () => {
  // Get categories to spread in context DataContext
  return await http()
    .get(`categories`)
    .then((response) => response.status === 200 && response.data)
    .then((data) => data.categories)
    .catch((error) => {
      // TODO : display the error in a dedicated location
    });
};
const getThemes = async () => {
  // Get themes to spread in context AllThemes
  return await http()
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
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sections, setSections] = useState([]); // Get sections
  const [categories, setCategories] = useState([]); // Get categories
  const [themes, setThemes] = useState([]); // Get themes

  useEffect(() => {
    // Get sections and themes from database and save them in state
    (async () => {
      setSections(await getSections());
      setCategories(await getCategories());
      setThemes(await getThemes());
    })();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      // if user not logged in, get the token and user info from local storage
      // TODO : check if tokenStorage is not exprired
      const tokenStorage = localStorage.getItem("token");
      const userStorage = localStorage.getItem("user");
      if (tokenStorage && userStorage) {
        setToken(tokenStorage);
        setUserCredentials(JSON.parse(userStorage));
        setIsLoggedIn(true);
      }
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    if (Object.entries(userCredentials).length > 0) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: userCredentials.name,
          mail: userCredentials.email,
          role: userCredentials.role,
        })
      );
    }
  }, [userCredentials]);

  useEffect(() => {
    if (token != null) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider
          value={{
            userCredentials,
            setUserCredentials,
            token,
            setToken,
            isLoggedIn,
            setIsLoggedIn,
          }}
        >
          <DataContext.Provider value={{ sections, categories, themes }}>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/themes" component={Themes} />
            <Route path="/categories/:sectionName" component={References} />
            <Route path="/themes/:themeName" component={References} />
            <Route exact path="/contact" component={Contact} />
            <Route path="/auth/:sign" component={Connection} />
            {/* TO DO: give proper route name to backend */}
            <Route exact path="/references">
              <Redirect to="/" />
            </Route>
            <Route path="/references/:id" component={RefSheet} />
            <Route
              exact
              path="/dashboard"
              component={isLoggedIn ? Dashboard : LoggedOut}
            />
            <Route exact path="/search" component={Search} />
            <Route exact path="/addReference" component={AddReference} />
            <Route
              exact
              path="/addReference/formReference"
              component={FormReference}
            />
            <Route
              exact
              path="/addReference/formReference/formSent"
              component={FormSent}
            />
          </DataContext.Provider>
        </UserContext.Provider>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
