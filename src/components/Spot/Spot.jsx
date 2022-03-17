import Avatar from "../../assets/images/avatar.png";
import Arrow from "../../assets/icons/spot_arrow.svg";
import Busd from "../../assets/icons/busd.svg";
import Bell from "../../assets/icons/bell.svg";
import Eth from "../../assets/icons/eth.svg";

import "./Spot.scss";

const SpotRegular = (props) => {
  return (
    <div>
      <div
        className={`${props.spotWidth} spotSingle`}
        //className="spotSingle"
      >
        <div className="spotBx2">
          <div className="spotAvi">
            <img src={Avatar} alt="avatar" />
          </div>
          <div className="spot_SingleContent">
            <div className="spotTxt">
              <p className="spotTitle">
                {props.singleSpot.projectName} (
                {props.singleSpot.mintToken || "Eth"})
              </p>
              {props.type === "regular" ? (
                <div className="spotDesc">
                  <p>WL #{props.singleSpot.id}</p>
                  <div className="spotAmt">
                    <img src={Busd} alt="usdc" />
                    <p>{props.singleSpot.whiteListPrice} USDC</p>
                  </div>
                </div>
              ) : (
                <div className="spotDesc2">
                  <div className="spotAmt">
                    <img src={Eth} alt="eth" />
                    <p> 0.001 Eth</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotRegular;
