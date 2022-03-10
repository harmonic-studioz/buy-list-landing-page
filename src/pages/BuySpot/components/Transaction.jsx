import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Avatar from '../../../assets/images/avatar.png'
import Busd from '../../../assets/icons/busd.svg'
import Eth from '../../../assets/icons/eth.svg'
import Discord from '../../../assets/icons/discord2.svg'
import Instagram from '../../../assets/icons/ig2.svg'
import Twitter from '../../../assets/icons/twitter2.svg'
import Copy from '../../../assets/icons/copy.svg'
import Notification from '../../../components/Modals/Notification'

const Transaction = () => {
  const [textCopied, setTextCopied] = useState(false)
  const [textView, setTextView] = useState(false)
  //const [chatView, setChatView] = useState(false)

  useEffect(() => {
    const handleVisible = () => {
      if (textCopied) {
        setTextView(true)
        setTimeout(() => {
          setTextView(false)
        }, 5000)
      }
    }
    handleVisible()
  }, [textCopied])

  return (
    <div className="bs-tranContent">
      {textView && (
        <Notification status={textCopied} message="ID copied to clipboard" />
      )}

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
        <div className="bst-walletDesc">
          <p>
            <strong>Here is your wallet ID</strong>{' '}
          </p>
          <div className="copyBx">
            <CopyToClipboard
              text={'0x4448672552ggse'}
              onCopy={() => setTextCopied(true)}
            >
              <img src={Copy} alt="copy" />
            </CopyToClipboard>

            <span>0x4448672552ggse</span>
          </div>
        </div>
        <div className="bst-timeBx">
          <p>20:00 Minutes</p>
        </div>
      </div>
    </div>
  )
}

export default Transaction
