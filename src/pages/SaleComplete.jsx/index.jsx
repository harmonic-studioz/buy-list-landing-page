import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import AcceptBtn from '../../components/AcceptBtn/AcceptBtn'
import Arrow from '../../assets/icons/arrow1.svg'
import './SaleComplete.scss'

import Transaction from '../BuySpot/components/Transaction'
import Modal01 from '../../components/Modals/Modal1'
import ChatIcon from '../../assets/icons/chat.svg'

const SaleComplete = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [chatView, setChatView] = useState(false)
  const [complete, setComplete] = useState(false)

  const handleSubmit = (e) => {
    console.log('ty')
    e.preventDefault()
    setComplete(true)
  }

  const handleClose = () => {
    setComplete(false)
  }

  return (
    <>
      <NavBar className="navContent" />
      {chatView === false ? (
        <div className=" animate__animated animate__fadeIn bsContainer ">
          <div className="bsContent">
            <form className="bsBox">
              <div className="bsBox-Top">
                <div className="bsb-title">
                  <Link to="/buySpot">
                    <img src={Arrow} alt="back" />
                  </Link>
                  <h1>Buy whitelist Spot</h1>
                  <div className="chatIcBox">
                    <img
                      onClick={() => setChatView(!chatView)}
                      src={ChatIcon}
                      alt="chat"
                    />
                  </div>
                </div>
              </div>
              <Transaction />
              <div className="bsBtn">
                <div className="bs-confirm">
                  <AcceptBtn />
                  <p>I have confirmed whitelist spot</p>
                </div>

                <button onClick={handleSubmit}>Release funds</button>
              </div>

              <div className="bsDisp">
                <p>Open dispute</p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="animate__animated animate__fadeIn bsContainer">
          <div className="bsContent2">
            <form className="bsBox">
              <div className="bsBox-Top">
                <div className="bsb-title">
                  <Link to="/buySpot">
                    <img src={Arrow} alt="back" />
                  </Link>
                  <h1>Buy whitelist Spot</h1>
                  <div className="chatIcBox">
                    {!chatView && (
                      <img
                        onClick={() => setChatView(!chatView)}
                        src={ChatIcon}
                        alt="chat"
                      />
                    )}
                  </div>
                </div>
              </div>
              <Transaction />
              <div className="bs-confirm">
                <AcceptBtn />
                <p>I have confirmed whitelist spot</p>
              </div>
              <div className="bsBtn">
                <button onClick={handleSubmit}>Release funds</button>
              </div>

              <div className="bsDisp">
                <p>Open dispute</p>
              </div>
            </form>
            <div className="sc-chatBox">
              <div className="sc-chatContent">
                <div className="scc-top">
                  <h2>Chat</h2>
                  <img
                    onClick={() => setChatView(!chatView)}
                    src={ChatIcon}
                    alt="chat"
                  />
                </div>
                <div className="scc-body">
                  <div className="receiveContent">
                    <div className="receiveBox">
                      <p>Send Wallet address</p>
                    </div>
                  </div>
                  <div className="sentContent">
                    <div className="sentBox">
                      <p>0xb2367019ccf</p>
                    </div>
                  </div>
                  <div className="receiveContent">
                    <div className="receiveBox">
                      <p>Send Wallet address</p>
                    </div>
                  </div>
                  <div className="sentContent">
                    <div className="sentBox">
                      <p>0xb2367019ccf</p>
                    </div>
                  </div>
                  <div className="sentContent">
                    <div className="sentBox">
                      <p>0xb2367019ccf</p>
                    </div>
                  </div>
                  <div className="sentContent">
                    <div className="sentBox">
                      <p>0xb2367019ccf</p>
                    </div>
                  </div>
                  <div className="sentContent">
                    <div className="sentBox">
                      <p>0xb2367019ccf</p>
                    </div>
                  </div>
                  <div className="sentContent">
                    <div className="sentBox">
                      <p>0xb2367019ccf</p>
                    </div>
                  </div>
                </div>
                <div className="scc-bottom">
                  <div className="scc-inputBox">
                    <input type="text" placeholder="Type message here" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {complete && (
        <Modal01
          message="Congratulations, you have bought WL spot #203 on crypto chunkz"
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default SaleComplete
