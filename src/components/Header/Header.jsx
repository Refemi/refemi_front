import React from 'react'
import { useHistory } from 'react-router'
import { VscSearch } from 'react-icons/vsc'

// Component
import Navbar from './Navbar'

import './Header.css'

// COMPONENT
export default function Header () {
  const history = useHistory()

  return (
    <header className="navbar flex">
      <span className="logo pointer">
        <span onClick={ () => history.push('/categories') } />
        <span onClick={ () => history.push('/themes') } />
        <span onClick={ () => history.push('/dashboard') } />
        <a href="/">refemi</a>
      </span>

      <Navbar />
      <VscSearch
        className="icon-navbar align-self-center pointer"
        size={20}
        onClick={ () => history.push('/search') }
      />
    </header>
  )
}
