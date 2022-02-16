import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Signup from './Signup'
import Arrow from '../../assets/icons/arrow1.svg'
import Metamask from '../../assets/icons/metamask.svg'
//import Twallet from '../../assets/icons/tr-wallet.svg'
import Check from '../../assets/icons/checkmark.svg'
const Connect = () => {
  let navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState('Connect')
  const [connected, setConnected] = useState(false)

  const handlePrevScreen = () => {
    if (connected) {
      setConnected(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="connectContent">
      {currentScreen === 'Connect' && (
        <>
          <div className="connectTop">
            <img onClick={handlePrevScreen} src={Arrow} alt="back" />
            <div className="coTop_txt">
              <h1>My wallet</h1>
              <p>
                Connect with one of our <span>wallet</span> providers
              </p>
            </div>
          </div>

          {!connected && (
            <div className="connectBox">
              <div
                className="connectBtn"
                onClick={() => setConnected(true)}
                //onClick={metamaskConnect}
              >
                <p>Metamask</p>
                <img src={Metamask} alt="metamask" />
              </div>
              <div
                className="connectBtn"
                onClick={() => setConnected(true)}
                // onClick={connectWallet}
              >
                <p>WalletConnect</p>
                <img src={Metamask} alt="metamask" />
              </div>
            </div>
          )}
          {connected && (
            <div className="connectCompleteBx">
              <img src={Check} alt="" />
              <p className="connectedtxt">
                Congratulations, You have connected your wallet, proceed to buy
                a whitelist spot
              </p>
              <div className="connectAdd">
                <p>0x446ccade12c</p>
              </div>
            </div>
          )}
          <div className="loginBx">
            <button
              disabled={!connected}
              onClick={() => setCurrentScreen('Signup')}
            >
              Login
            </button>
          </div>
        </>
      )}
      {currentScreen === 'Signup' && <Signup />}
    </div>
  )
}

export default Connect
