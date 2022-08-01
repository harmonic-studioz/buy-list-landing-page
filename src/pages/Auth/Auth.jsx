import { motion } from 'framer-motion'
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
            <motion.img
              src={Saly}
              alt="illustration"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  //scale: 0.4,
                  y: 100,
                  opacity: 0,
                  rotate: -30,
                },
                visible: {
                  //scale: 1,
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    duration: 0.5,
                  },
                },
              }}
            />
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
