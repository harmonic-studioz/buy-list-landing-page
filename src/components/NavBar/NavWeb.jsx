import React from 'react'
import { Link } from 'react-router-dom'
import './NavW.scss'
import Logo from '../../assets/logo.png'

const NavWeb = () => {
  return (
    <div className="navContainer">
      <nav className="navContent">
        <div className="logoBox">
          <img src={Logo} alt="logo" />
        </div>
        <ul className="navMid">
          <Link to="/">
            {' '}
            <li className="hvr-underline-from-left">About us</li>
          </Link>
          <Link to="/">
            <li className="hvr-underline-from-left">How it works </li>
          </Link>
          <Link to="/">
            <li className="hvr-underline-from-left">Contact us</li>
          </Link>
        </ul>
        <div className="navRight">
          <button>Connect wallet</button>
          <button>Buy spot</button>
        </div>
      </nav>
    </div>
  )
}

export default NavWeb
