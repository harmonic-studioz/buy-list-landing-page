import './SellSpot.scss'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import AcceptBtn from '../../components/AcceptBtn/AcceptBtn'

import Saly from '../../assets/images/saly02.svg'
import Arrow from '../../assets/icons/arrow1.svg'
import Avatar from '../../assets/images/avatar.png'
import Busd from '../../assets/icons/busd.svg'
import Eth from '../../assets/icons/eth.svg'
import Discord from '../../assets/icons/discord2.svg'
import Instagram from '../../assets/icons/ig2.svg'
import Twitter from '../../assets/icons/twitter2.svg'
import Modal01 from '../../components/Modals/Modal1'

const SellSpot = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [complete, setComplete] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setComplete(true)
  }
  const handleClose = () => {
    setComplete(false)
  }
  return (
    <>
      <NavBar className="navContent" />
      {complete && (
        <Modal01
          message="Congratulations, you have bought WL spot #203 on crypto chunkz"
          handleClose={handleClose}
        />
      )}
      <div className="bsContainer">
        <div className="bsContent">
          <div className="bsLeft">
            <div className="bsImg">
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
          <div className="bsRight">
            <form className="bsBox">
              <div className="bsBox-Top">
                <div className="bsb-title">
                  <Link to="/home">
                    <img src={Arrow} alt="back" />
                  </Link>
                  <h1>Whitelist p2p transaction</h1>
                </div>
              </div>
              <div className="bs-tranContent">
                <div className="bs-buyDesc">
                  <span>Minting at</span>
                  <div className="bs-buyPrice">
                    <img src={Eth} alt="eth" />
                    <p>0.001ETH</p>
                  </div>
                </div>
                <div className="bs-buySpot">
                  <div className="spotAvi2">
                    <img src={Avatar} alt="avatar" />
                  </div>
                  <div className="bs-buySpotTxt">
                    <p className="bsb-title">Crypto chunkz</p>
                    <span>23h 44mins</span>
                    <div className="bsb-btm">
                      <div className="bsb-price">
                        <img src={Busd} alt="busd" />
                        <p>150 USDC</p>
                      </div>
                      <div className="bsb-icons">
                        <img src={Discord} alt="discord" />
                        <img src={Instagram} alt="instagram" />
                        <img src={Twitter} alt="twitter" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bs-tranBody">
                  <div className="bst-timeBx">
                    <p>20:00 Minutes</p>
                  </div>
                </div>
              </div>
              <div className="bsBtn">
                <div className="bs-confirm">
                  <AcceptBtn />
                  <p>I have updated the whitelist spot</p>
                </div>

                <button onClick={handleSubmit}>Complete sale</button>
              </div>

              <div className="bsDisp">
                <p>Open dispute</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SellSpot
