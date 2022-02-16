import React from 'react'
import { Link } from 'react-router-dom'
import './NavW.scss'
import Logo from '../../assets/logo.png'
import Search from '../../assets/icons/search.svg'

const NavWeb = (props) => {
  const Page = 'Landing'
  return (
    <div className="navContainer">
      <nav className={props.className}>
        {Page === 'Landing' && (
          <div className="logoBox">
            <img src={Logo} alt="logo" />
          </div>
        )}
        {Page !== 'Landing' && (
          <Link className="logoBox" to="/">
            <img src={Logo} alt="logo" />
          </Link>
        )}
        <ul className="navMid">
          <a href="/#works">
            <li className="hvr-underline-from-left">How it works </li>
          </a>
          <a href="/#faq">
            {' '}
            <li className="hvr-underline-from-left">FAQs</li>
          </a>
          <a href="mailto:support@buylistnft.com">
            <li className="hvr-underline-from-left">Contact us</li>
          </a>
        </ul>
        <div className="navRight">
          <div className="navSearch">
            <input type="text" placeholder="Search project" />
            <img src={Search} alt="search" />
          </div>
          {/* <Link to="/auth"> */}
          <button className="nav_Connect">Connect wallet</button>
          {/* </Link> */}
        </div>
      </nav>
    </div>
  )
}

export default NavWeb
