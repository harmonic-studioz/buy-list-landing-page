import Avatar from "../../../assets/images/avatar.png";
import Busd from "../../../assets/icons/busd.svg";
//import Eth from '../../../assets/icons/eth.svg'
import Discord from "../../../assets/icons/discord2.svg";
import Instagram from "../../../assets/icons/ig2.svg";
import Twitter from "../../../assets/icons/twitter2.svg";

const Buy = (props) => {
  return (
    <div className="bs-buyContent">
      {props.singleSpot && (
        <>
          <div className="bs-buyDesc">
            <span>Minting at</span>
            <div className="bs-buyPrice">
              {/* <img src={Eth} alt="eth" /> */}
              <p>{props.singleSpot.mintPrice} USDC</p>
            </div>
          </div>
          <div className="bs-buySpot">
            <div className="spotAvi2">
              <img src={Avatar} alt="avatar" />
            </div>
            <div className="bs-buySpotTxt">
              <p className="bsb-title">{props.singleSpot.projectName}</p>
              <span>{props.singleSpot.mintDate.substr(0, 10)}</span>
              <div className="bsb-btm">
                <div className="bsb-price">
                  <img src={Busd} alt="usdc" />
                  <p>{props.singleSpot.whiteListPrice} USDC</p>
                </div>
                <div className="bsb-icons">
                  <img src={Discord} alt="discord" />
                  <img src={Instagram} alt="instagram" />
                  <img src={Twitter} alt="twitter" />
                </div>
              </div>
            </div>
          </div>
          <div className="bs-socials">
            <h3>Seller socials</h3>
            <p>
              We have provided you with the users verification details of this
              sale
            </p>
            <div className="bs-socialLinks">
              <div className="bs-socialLink">
                <img src={Twitter} alt="twitter" />
                <span>twitter.com/{props.singleSpot.twitterUsername}</span>
              </div>
              <div className="bs-socialLink">
                <img src={Instagram} alt="twitter" />
                <span>instagram.com/{props.singleSpot.userDiscordId}</span>
              </div>
            </div>
          </div>
          <div className="bs-screenshots">
            <h3>Screenshots</h3>
            <div className="bs-screenshot">
              <img src={props.singleSpot.discordShot} alt="sc" />
              Discord.png
            </div>
            <div className="bs-screenshot">
              <img src={props.singleSpot.twitterShot} alt="sc" />
              Twitter.png
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Buy;
