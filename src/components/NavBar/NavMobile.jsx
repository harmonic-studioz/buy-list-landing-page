import { useEffect, useRef } from 'react'
import { gsap, Power3, Expo } from 'gsap'
import './NavM.scss'
import Logo from '../../assets/logo.png'
import Hamburger from '../../assets/icons/hamburger.svg'
import Close from '../../assets/icons/close.svg'

const NavMobile = () => {
  let { navContainer } = useRef()
  useEffect(() => {
    const t1 = gsap.timeline({ paused: true })
    t1.to(navContainer, 1, {
      left: 0,
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
    let mo = document.querySelector('.hamBox')
    mo.onclick = function () {
      t1.reversed(!t1.reversed())
    }
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
        <div className="hamBox">
          <img src={Hamburger} alt="hamburger" />
        </div>
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
              <li>About us</li>
              <li>How it works</li>
              <li>
                {' '}
                <a href="mailto:support@buylistnft.com">Contact us</a>
              </li>
            </ul>
          </div>
          <div className="menuBtns" id="menuBtns">
            <button>Buy spot</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavMobile
