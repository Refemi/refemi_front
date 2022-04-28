import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { VscSearch } from 'react-icons/vsc';
import { useScrollDirection } from '../../utils/useScrollDirection';

// Component
import Navbar from './Navbar';

export const HeaderContext = createContext();

// COMPONENT
export default function Header() {
  const history = useHistory();
  const scrollDirection = useScrollDirection();
  const [toggleMenu, setToggleMenu] = useState(false);

  const showToggleMenu = () => {
    const closeToggle = (e) => {
      e.preventDefault();
      setToggleMenu(false);
      document.removeEventListener("click", closeToggle); 
      window.onscroll = () => {};
    }

    window.onscroll = () => { 
      window.scrollTo(window.pageXOffset, window.pageYOffset); 
    };

    document.addEventListener("click", (e) => {
      // Do not close the panel if you click inside
      if (!e.path.find(p => p.localName === 'header')) {
        closeToggle(e);
      }
    });
  };

  useEffect(() => {
    !!toggleMenu && showToggleMenu();
  }, [toggleMenu]);


  return (
    <header
      className={`${
        !toggleMenu && scrollDirection === 'down'
          ? 'refemi-navbar refemi-navbar_down'
          : 'refemi-navbar'
      } is-flex is-justify-content-space-around`}
    >
      <picture className='logo pointer'>
        <span
          className='logo-square'
          onClick={() => history.push('/categories')}
        />
        <span className='logo-square' onClick={() => history.push('/themes')} />
        <span
          className='logo-square'
          onClick={() => history.push('/dashboard')}
        />
        <h1>
          <a href='/' className='refemi logo-square_link'>
            refemi
          </a>
        </h1>
      </picture>

      <HeaderContext.Provider
        value={{
          toggleMenu, setToggleMenu
        }}
      >
        <Navbar />
        <VscSearch
          className='icon-navbar is-align-self-center pointer'
          size={20}
          onClick={() => history.push('/search')}
        />
      </HeaderContext.Provider>
    </header>
  );
}
