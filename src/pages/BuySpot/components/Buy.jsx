import { useState } from "react";
import Avatar from "../../../assets/images/avatar.png";
import Busd from "../../../assets/icons/busd.svg";
//import Eth from '../../../assets/icons/eth.svg'
import Discord from "../../../assets/icons/discord2.svg";
import Instagram from "../../../assets/icons/ig2.svg";
import Twitter from "../../../assets/icons/twitter2.svg";
import ImageModal from "./imageModal";

const Buy = (props) => {
  const [modal, setModal] = useState(false);
  const [imgView, setImgView] = useState(1);

  const handleClose = () => {
    setModal(false);
  };

  const handleImgModal = (value) => {
    setModal(true);
    setImgView(value);
  };

  return (
    <div className="bs-buyContent">
      {modal && (
        <ImageModal
          handleClose={handleClose}
          imgView={imgView}
          singleSpot={props.singleSpot}
        />
      )}
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
                  <a
                    href={`https://discord.com/${props.singleSpot.userDiscordId}`}
                  >
                    <img src={Discord} alt="discord" />
                  </a>
                  <a
                    href={`https://instagram.com/${props.singleSpot.userDiscordId}`}
                  >
                    <img src={Instagram} alt="instagram" />
                  </a>
                  <a
                    href={`https://twitter.com/${props.singleSpot.twitterUsername}`}
                  >
                    <img src={Twitter} alt="twitter" />
                  </a>
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
                <a
                  href={`https://twitter.com/${props.singleSpot.twitterUsername}`}
                >
                  <span>twitter.com/{props.singleSpot.twitterUsername}</span>
                </a>
              </div>
              <div className="bs-socialLink">
                <img src={Instagram} alt="twitter" />
                <a
                  href={`https://instagram.com/${props.singleSpot.userDiscordId}`}
                >
                  <span>instagram.com/{props.singleSpot.userDiscordId}</span>
                </a>
              </div>
            </div>
          </div>
          <div className="bs-screenshots">
            <h3>Screenshots</h3>
            <div className="bs-screenshot" onClick={() => handleImgModal(1)}>
              <img src={props.singleSpot.discordShot} alt="sc" />
              Discord.png
            </div>
            <div className="bs-screenshot" onClick={() => handleImgModal(2)}>
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
