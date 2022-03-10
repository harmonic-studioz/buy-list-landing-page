import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../../assets/images/avatar.png'
import Arrow from '../../../assets/icons/spot_arrow.svg'
import Busd from '../../../assets/icons/busd.svg'
import Bell from '../../../assets/icons/bell.svg'
import Eth from '../../../assets/icons/eth.svg'

const Spots = (props) => {
  const [spotsView, setSpotsView] = useState('limit')
  const [activeSpots, setActiveSpots] = useState([])

  useEffect(() => {
    setActiveSpots(props.activeSpots)
  }, [props])

  return (
    <div className="spotsContainer">
      <div className="spotsContent">
        <h2>{props.title}</h2>
        {props.type === 'regular' && (
          <div className="spotsRows">
            {activeSpots &&
              activeSpots.map((aSpot) => (
                <div key={aSpot.id} className="spotSingle">
                  <Link to={`/buySpot/${aSpot.id}`} className="spotBx">
                    <div className="spotAvi">
                      <img src={Avatar} alt="avatar" />
                    </div>
                    <div className="spot_SingleContent">
                      <div className="spotTxt">
                        <p className="spotTitle">{aSpot.projectName} (Eth)</p>
                        {props.type === 'regular' ? (
                          <div className="spotDesc">
                            <p>WL #{aSpot?.whiteListNo}</p>
                            <div className="spotAmt">
                              <img src={Busd} alt="usdc" />
                              <p>{aSpot?.whiteListPrice} USDC</p>
                            </div>
                          </div>
                        ) : (
                          <div className="spotDesc2">
                            <div className="spotAmt">
                              <img src={Eth} alt="eth" />
                              <p>
                                {' '}
                                {aSpot?.whiteListPrice} {aSpot?.mintToken}
                              </p>
                            </div>
                            <div className="spotBell">
                              <img src={Bell} alt="bell" />
                            </div>
                            <p>22-03-22</p>
                          </div>
                        )}
                      </div>
                      <div className="spotArr">
                        <img src={Arrow} alt="arrow" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
        {props.type === 'monitor' && (
          <div className="spotsRows">
            {props.activeSpots &&
              props.activeSpots.map((aSpot) => (
                <div key={aSpot.id} className="spotSingle">
                  <Link to={`/project/${aSpot.id}`} className="spotBx">
                    <div className="spotAvi">
                      <img src={Avatar} alt="avatar" />
                    </div>
                    <div className="spot_SingleContent2">
                      <div className="spotTxt">
                        <p className="spotTitle">
                          {aSpot.projectName} ({aSpot?.mintToken})
                        </p>
                        {props.type === 'regular' ? (
                          <div className="spotDesc">
                            <p>WL #{aSpot?.whiteListNo}</p>
                            <div className="spotAmt">
                              <img src={Busd} alt="usdc" />
                              <p>
                                {aSpot?.whiteListPrice} {aSpot?.mintToken}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="spotDesc2">
                            <div className="spotAmt">
                              <img src={Eth} alt="eth" />
                              <p>
                                {' '}
                                {aSpot?.mintPrice} {aSpot?.mintToken}
                              </p>
                            </div>
                            <div className="spotBell">
                              <img src={Bell} alt="bell" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="spotArr">
                        <img src={Arrow} alt="arrow" />
                      </div>
                      <div className="m-date">
                        {props.type === 'monitor' && <p>Dropping : 22-03-22</p>}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
        {spotsView === 'limit' && (
          <div className="spotBtm">
            <p onClick={() => setSpotsView('all')}>SEE ALL</p>
          </div>
        )}
        {spotsView === 'all' && (
          <div className="spotBtm">
            <p onClick={() => setSpotsView('limit')}>SEE LESS</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Spots
