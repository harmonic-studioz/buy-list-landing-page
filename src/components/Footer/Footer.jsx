import { Link } from 'react-router-dom'
import Logo from '../../assets/footlogo.svg'
import Logo2 from '../../assets/footlogo.png'
import Discord from '../../assets/icons/discord.svg'
import IG from '../../assets/icons/ig.svg'
import Twitter from '../../assets/icons/twitter.svg'
import './Footer.scss'
const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerContent">
        <div className="footLogo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="footLinks">
          <Link to="/">
            <p className="hvr-underline-from-left">About us</p>
          </Link>
          <Link to="/">
            <p className="hvr-underline-from-left">How it works</p>
          </Link>
          <a href="mailto:support@buylistnft.com">
            <p className="hvr-underline-from-left">Contact us</p>
          </a>
        </div>
        <div className="footIcons">
          <Link to="/">
            <img src={Discord} className="hvr-pulse" alt="discord" />
          </Link>
          <Link to="/">
            <img src={IG} className="hvr-pulse" alt="IG" />
          </Link>
          <Link to="/">
            <img src={Twitter} className="hvr-pulse" alt="twitter" />
          </Link>
        </div>
      </div>
      <div className="footerContentM">
        <div className="footLeftM">
          <div className="footLogoM">
            <img src={Logo2} alt="logo" />
          </div>
          <div className="footIconsM">
            <Link to="/">
              <img src={Discord} alt="discord" />
            </Link>
            <Link to="/">
              <img src={IG} alt="IG" />
            </Link>
            <Link to="/">
              <img src={Twitter} alt="twitter" />
            </Link>
          </div>
        </div>
        <div className="footRightM">
          <Link to="/">
            <p className="hvr-underline-from-left">About us</p>
          </Link>
          <Link to="/">
            <p className="hvr-underline-from-left">How it works</p>
          </Link>
          <Link to="/">
            <p className="hvr-underline-from-left">Contact us</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
