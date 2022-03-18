import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Avatar from "../../../assets/images/avatar.png";
import Busd from "../../../assets/icons/busd.svg";
import Eth from "../../../assets/icons/eth.svg";
import Discord from "../../../assets/icons/discord2.svg";
import Instagram from "../../../assets/icons/ig2.svg";
import Twitter from "../../../assets/icons/twitter2.svg";
import Copy from "../../../assets/icons/copy.svg";
import Notification from "../../../components/Modals/Notification";

import { shortenAddress } from "../../../utils/shortenAddress";

const Transaction = (props) => {
  const [textCopied, setTextCopied] = useState(false);
  const [textView, setTextView] = useState(false);
  //const [chatView, setChatView] = useState(false)

  const currentAccount = localStorage.getItem("currentAccount");

  useEffect(() => {
    const handleVisible = () => {
      if (textCopied) {
        setTextView(true);
        setTimeout(() => {
          setTextView(false);
        }, 5000);
      }
    };
    handleVisible();
  }, [textCopied]);

  return (
    <div className="bs-tranContent">
      {textView && (
        <Notification status={textCopied} message="ID copied to clipboard" />
      )}

      <div className="bs-buyDesc">
        <span>Minting at</span>
        <div className="bs-buyPrice">
          <img src={Eth} alt="eth" />
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
              <img src={Busd} alt="busd" />
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
      <div className="bs-tranBody">
        <div className="bst-walletDesc">
          <p>
            <strong>Here is your wallet ID</strong>{" "}
          </p>
          <div className="copyBx">
            <CopyToClipboard
              text={currentAccount}
              onCopy={() => setTextCopied(true)}
            >
              <img src={Copy} alt="copy" />
            </CopyToClipboard>
            <span>{shortenAddress(currentAccount)}</span>
          </div>
        </div>
        {/* <div className="bst-timeBx">
          <p>20:00 Minutes</p>
        </div> */}
      </div>
    </div>
  );
};

export default Transaction;
