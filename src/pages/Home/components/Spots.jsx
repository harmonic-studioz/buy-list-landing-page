import Avatar from '../../../assets/images/avatar.png'
import Arrow from '../../../assets/icons/spot_arrow.svg'
import Busd from '../../../assets/icons/busd.svg'

const Spots = (props) => {
  return (
    <div className="spotsContainer">
      <div className="spotsContent">
        <h2>Trending today</h2>
        <div className="spotsRows">
          <div className="spotSingle">
            <div className="spotBx">
              <div className="spotAvi">
                <img src={Avatar} alt="avatar" />
              </div>
              <div className="spot_SingleContent">
                <div className="spotTxt">
                  <p className="spotTitle">Crypto chunkz (Eth)</p>
                  <div className="spotDesc">
                    <p>WL #203</p>
                    <div className="spotAmt">
                      <img src={Busd} alt="busd" />
                      <p>150 BUSD</p>
                    </div>
                  </div>
                </div>
                <div className="spotArr">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
            </div>
          </div>

          <div className="spotSingle">
            <div className="spotBx">
              <div className="spotAvi">
                <img src={Avatar} alt="avatar" />
              </div>
              <div className="spot_SingleContent">
                <div className="spotTxt">
                  <p className="spotTitle">Crypto chunkz (Eth)</p>
                  <div className="spotDesc">
                    <p>WL #203</p>
                    <div className="spotAmt">
                      <img src={Busd} alt="busd" />
                      <p>150 BUSD</p>
                    </div>
                  </div>
                </div>
                <div className="spotArr">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
            </div>
          </div>

          <div className="spotSingle">
            <div className="spotBx">
              <div className="spotAvi">
                <img src={Avatar} alt="avatar" />
              </div>
              <div className="spot_SingleContent">
                <div className="spotTxt">
                  <p className="spotTitle">Crypto chunkz (Eth)</p>
                  <div className="spotDesc">
                    <p>WL #203</p>
                    <div className="spotAmt">
                      <img src={Busd} alt="busd" />
                      <p>150 BUSD</p>
                    </div>
                  </div>
                </div>
                <div className="spotArr">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
            </div>
          </div>

          <div className="spotSingle">
            <div className="spotBx">
              <div className="spotAvi">
                <img src={Avatar} alt="avatar" />
              </div>
              <div className="spot_SingleContent">
                <div className="spotTxt">
                  <p className="spotTitle">Crypto chunkz (Eth)</p>
                  <div className="spotDesc">
                    <p>WL #203</p>
                    <div className="spotAmt">
                      <img src={Busd} alt="busd" />
                      <p>150 BUSD</p>
                    </div>
                  </div>
                </div>
                <div className="spotArr">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spotBtm">
          <p>SEE ALL</p>
        </div>
      </div>
    </div>
  )
}

export default Spots
