import './Auth.scss'
import Logo from '../../assets/logo.png'
import Saly from '../../assets/images/saly02.svg'
import Connect from './Connect'

const Auth = () => {
  return (
    <div className="authContainer">
      <div className="authContent">
        <div className="authLeft">
          <div className="authLogo">
            {' '}
            <img src={Logo} alt="logo" />
          </div>

          <div className="authImg">
            <img src={Saly} alt="illustration" />
          </div>
        </div>
        <div className="authRight">
          <div className="authBox">
            <Connect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
