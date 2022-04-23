import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'

import Arrow from '../../assets/icons/arrow1.svg'
import Arrowsm from '../../assets/icons/spot_arrow.svg'

const ListOption = () => {
  return (
    <>
      <NavBar className="navContent" />
      <div className="bsContainer">
        <div className="bsContent">
          <div className="bsBox">
            <div className="bsBox-Top">
              <div className="bsb-title">
                <Link to="/home">
                  <img src={Arrow} alt="back" />
                </Link>
                <h1>Post whitelist Ad</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="optionBoxes">
          <Link to="/listSellSpot" className="optionBox">
            <p>Post a Sell Ad</p>
            <img src={Arrowsm} alt="arrow" />
          </Link>
          <Link to="/listOptions" className="optionBox disabled">
            <p>Post a Buy Ad</p>
            <img src={Arrowsm} alt="arrow" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default ListOption
