import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, Power3, Expo } from 'gsap'
import './NavM.scss'
import Logo from '../../assets/logo.png'
import Hamburger from '../../assets/icons/hamburger.svg'
import Close from '../../assets/icons/close.svg'

import { shortenAddress } from '../../utils/shortenAddress'

const NavMobile = (props) => {
  let { navContainer } = useRef()
  const currentAccount = localStorage.getItem('currentAccount')
  useEffect(() => {
    const t1 = gsap.timeline({ paused: true })
    t1.to(navContainer, 1, {
      right: 0,
      ease: Power3.easeInOut,
    })
    let menuLogo = document.getElementById('mLogo')
    t1.staggerFrom(
      menuLogo,
      0.2,
      { opacity: 0, ease: Expo.easeOut },
      '0.1',
      '-=0.2',
    )
    let menuItems = document.querySelectorAll('.menuLinks > li')
    let link1 = document.getElementById('link1')
    let link2 = document.getElementById('link2')
    let link3 = document.getElementById('link3')
    t1.staggerFrom(
      menuItems,
      0.6,
      { x: 100, opacity: 0, ease: Expo.easeOut },
      '0.1',
      '-=0.2',
    )
    let menuBtns = document.getElementById('menuBtns')
    t1.staggerFrom(
      menuBtns,
      0.2,
      { y: 100, opacity: 0, ease: Expo.easeOut },
      '0.1',
      '-=0.2',
    )

    t1.reverse()
    // let mo = document.querySelector('.hamBox')
    // mo.onclick = function () {
    //   t1.reversed(!t1.reversed())
    // }
    //
    link1.onclick = function () {
      t1.reversed(!t1.reversed())
    }
    link2.onclick = function () {
      t1.reversed(!t1.reversed())
    }
    link3.onclick = function () {
      t1.reversed(!t1.reversed())
    }
    //
    let mc = document.querySelector('.closeMenu')
    mc.onclick = function () {
      t1.reversed(!t1.reversed())
    }
  }, [navContainer])
  return (
    <div className="navContainerMobile">
      <nav className="navContentM">
        <div className="logoBoxM">
          <img src={Logo} alt="logo" />
        </div>
        {/* <div className="hamBox">
          <img src={Hamburger} alt="hamburger" />
        </div> */}
      </nav>
      <nav
        className="nav-menu"
        ref={(el) => {
          navContainer = el
        }}
      >
        <div className="menuContent">
          <div className="menuTop">
            <div className="me-logo" id="mLogo">
              <img src={Logo} alt="logo" />
            </div>

            <div className="closeMenu">
              <img src={Close} alt="close" />
            </div>
          </div>
          <div className="menuBody">
            <ul className="menuLinks">
              <li className="mlink" id="link1">
                {' '}
                {/* <a href="/#works">How it works </a> */}
              </li>

              <li className="mlink" id="link2">
                {' '}
                {/* <a href="/#faq">FAQs </a> */}
              </li>
              {props.className === 'navContentLanding' ? (
                <li className="mlink" id="link3">
                  {' '}
                  {/* <a href="mailto:support@buylistnft.com">Contact us</a> */}
                </li>
              ) : (
                <li className="mlink" id="link3">
                  {' '}
                  {/* <Link to="/userLists">Your lists</Link> */}
                </li>
              )}
            </ul>
          </div>

          {/* <Link to="/auth" className="menuBtns" id="menuBtns"> */}
          <div className="menuBtns" id="menuBtns">
            {/* <button className="disabledFull">
              {!currentAccount
                ? 'Connect wallet'
                : ''//shortenAddress(currentAccount)
              }
            </button> */}
            <button >Sign up</button>
          </div>
          {/* </Link> */}
        </div>
      </nav>
    </div>
  )
}

export default NavMobile
