import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

// JS
import { getThemes, getSections, getCategories } from "./services/getData";

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
import AddReference from "./components/Dashboard/FormDashboard/AddReference";
import FormReference from "./components/Dashboard/FormDashboard/FormReference";

// CSS
import "./styles/css/style.css";
import "bulma/css/bulma.min.css";

// Contexts
export const UserContext = createContext();
export const DataContext = createContext();

// COMPONENT
export default function App() {
  const [userCredentials, setUserCredentials] = useState({});
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sections, setSections] = useState([]); // Get sections
  const [categories, setCategories] = useState([]); // Get categories
  const [themes, setThemes] = useState([]); // Get themes

  const getData = async () => {
    setSections(await getSections());
    setCategories(await getCategories());
    setThemes(await getThemes());
  };

  useEffect(() => {
    getData();
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
            <Route
              exact
              path="/addReference/formReference"
              component={FormReference}
            />
            <Route path="/categories/:sectionName" component={References} />
            <Route path="/themes/:themeName" component={References} />
            <Route exact path="/references">
              <Redirect to="/" />
            </Route>
            <Route path="/references/:id" component={RefSheet} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/addReference" component={AddReference} />
            <Route
              exact
              path="/dashboard"
              component={isLoggedIn ? Dashboard : LoggedOut}
            />
          </DataContext.Provider>
          <Route
            exact
            path="/addReference/formReference/formSent"
            component={FormSent}
          />
          <Route exact path="/contact" component={Contact} />
          <Route path="/auth/:sign" component={Connection} />
        </UserContext.Provider>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
