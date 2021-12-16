import React, { useState, createContext, useEffect } from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

import Home from './views/Home'
import Contact from './views/Contact'
import Sign from './views/Sign'
import Themes from './views/Themes'
import Categories from './views/Categories'
import References from './views/References'
import RefSheet from './views/RefSheet'
import Dashboard from './views/Dashboard'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Search from './components/SearchBar/Search'

import './App.css'

export const UserCredentials = createContext()
export const AllCategories = createContext()
export const AllThemes = createContext()

const App = () => {
  const [userCredentials, setUserCredentials] = useState({})
  const [token, setToken] = useState(null)
  const [isLogged, setLogged] = useState(false)
  const [categories, setCategories] = useState([])
  const [themes, setThemes] = useState([])

  const getCategories = () =>
    fetch('http://localhost:8000/categories')
      .then(response => response.json())
      .then(response => setCategories(response.categories))

  const getThemes = () =>
    fetch('http://localhost:8000/themes')
      .then(response => response.json())
      .then(response => setThemes(response.themes))

  useEffect(() => {
    getCategories()
    getThemes()
  }, [])

  useEffect(() => {
    if (!isLogged) {
      const tokenStorage = localStorage.getItem('token')
      const userStorage = localStorage.getItem('user')

      if (tokenStorage && userStorage) {
        setToken(tokenStorage)
        setUserCredentials(JSON.parse(userStorage))
        setLogged(true)
      }
    }
  }, [isLogged])

  return (
    <BrowserRouter>
      <Switch>
        <UserCredentials.Provider
          value={{
            userCredentials,
            setUserCredentials,
            token,
            setToken,
            isLogged,
            setLogged
          }}
        >
          <Header />
          <AllCategories.Provider value={{ categories }}>
            <AllThemes.Provider value={{ themes, setThemes }}>
              <Route exact path="/" component={Home} />
              <Route exact path="/categories" component={Categories} />
              <Route path="/categories/:categoryName" component={References} />
              <Route exact path="/themes" component={Themes} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/auth/:sign" component={Sign} />
              <Route exact path="/references">
                <Redirect to="/" />
              </Route>
              <Route path="/references/:id" component={RefSheet} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/search" component={Search} />
            </AllThemes.Provider>
          </AllCategories.Provider>
        </UserCredentials.Provider>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
