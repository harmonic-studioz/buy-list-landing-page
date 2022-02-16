import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './NavM.scss'
// import Hamburger from '../../assets/icons/hamburger.svg'
// import Close from '../../assets/icons/close.svg'

const NavM = () => {
  return (
    <div className="navContainerMobile">
      <nav className="navContentM">
        <div className="logoBoxM">
          <img src={Logo} alt="logo" />
        </div>
        <div className="menu-wrap ">
          <input type="checkbox" className="toggler" />
          <div className="hamburger">
            <div></div>
          </div>
          <div className="menu showMenuX">
            <div>
              <div>
                <ul>
                  <motion.li>
                    <Link to="/episodes">EPISODES</Link>
                  </motion.li>
                  <motion.li>
                    <Link to="/episodes">EPISODES</Link>
                  </motion.li>
                  <motion.li>
                    <Link to="/about">ABOUT</Link>
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavM
