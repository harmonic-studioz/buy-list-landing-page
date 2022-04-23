import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavW.scss'
import Logo from '../../assets/logo.png'
import Search from '../../assets/icons/search.svg'
import Add from '../../assets/icons/add.svg'
import { CircularProgress } from '@material-ui/core'
import Notification from '../../components/Modals/Notification2'
import ReactHowler from 'react-howler'
import Audio from '../../assets/sound/alert.mp3'

import { TransactionContext } from '../../context/TransactionContext'
import UniContext from '../../context/UniContext'
//import { shortenAddress } from '../../utils/shortenAddress'
import { publicRequest } from '../../utils/requestMethods'
import { logger } from '../../utils/logger'

//let socket;
const NavWeb = (props) => {
  const Page = 'Landing'
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line
  const [transactionAlert, setTransactionAlert] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState('')

  const currentAccount = localStorage.getItem('currentAccount')

  const { newTransaction, newMsg } = useContext(TransactionContext)
  const { disonnectWallet } = useContext(UniContext)

  const [newTransactionVal, setNewTransactionVal] = newTransaction
  const [newMsgVal, setNewMsgVal] = newMsg

  useEffect(() => {
    if (newTransactionVal) {
      console.log('new transaction dey o' + JSON.stringify(newTransactionVal))
      localStorage.setItem('spotInFocus', newTransactionVal?.spotId)
      setNotificationMsg(
        `An offer has been made for wl #${newTransactionVal?.spotId}`,
      )
      setTransactionAlert(true)
      if (
        newTransactionVal.status === '0' ||
        newTransactionVal.fromState === '0'
      ) {
        setNotificationMsg(
          `Payment has been made for wl #${newTransactionVal?.spotId}`,
        )
        // localStorage.setItem(
        //   'currentTransactionId',
        //   newTransactionVal?.transactionId,
        // )
      } else if (
        newTransactionVal.status === '1' ||
        newTransactionVal.fromState === '1'
      ) {
        setNotificationMsg(`wl #${newTransactionVal?.spotId} has been approved`)
      } else if (
        newTransactionVal.status === '2' ||
        newTransactionVal.fromState === '2'
      ) {
        setNotificationMsg(`wl #${newTransactionVal?.spotId} has been sold!`)
      } else if (
        newTransactionVal.status === '3' ||
        newTransactionVal.fromState === '3'
      ) {
        setNotificationMsg(`wl #${newTransactionVal?.spotId} has been sold!`)
      } else if (
        newTransactionVal.status === '4' ||
        newTransactionVal.fromState === '4'
      ) {
        setNotificationMsg(`wl #${newTransactionVal?.spotId} has been sold!`)
      }
    }

    if (newMsgVal) {
      setNotificationMsg(`New chat message: "${newMsgVal?.text}"`)
      //localStorage.setItem('currentTransactionId', newMsgVal?.transactionId)
      console.log(newMsgVal, 'new spot objectttt')
      localStorage.setItem('spotInFocus', newMsgVal?.spotIdValue)
    }
    setTransactionAlert(true)
  }, [newTransactionVal, newMsgVal])

  const closeNotification = () => {
    if (newTransactionVal) {
      navigate(`/completeSale/${newTransactionVal?.id}`)
      setNewTransactionVal()
      setTransactionAlert(false)
    } else if (newMsgVal) {
      navigate(`/completeSale/${newMsgVal?.transactionId}`)
      setNewMsgVal()
      setTransactionAlert(false)
    }
    //setTransactionAlert(false)
    // else{
    // setNewTransactionVal()
    // setNewMsgVal()

    //}
    // prompt("working");
  }

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.length >= 3) {
        setIsLoading(true)
        try {
          const searchReq1 = await publicRequest.get(
            `spot/search?projectName=${searchTerm}`,
          )
          logger('REQ RESPONSE: ', searchReq1.data)
          const searchReq2 = await publicRequest.get(
            `/projects/search?projectName=${searchTerm}`,
          )
          logger('REQ RESPONSE: ', searchReq2.data)
          setSearchRes(searchReq1.data.concat(searchReq2.data))
          setIsLoading(false)
        } catch (err) {
          logger(' ERROR::: ', err)
        }
      } else {
        return
      }
    }
    handleSearch()
  }, [searchTerm])

  const handleConnect = async () => {
    if (currentAccount) {
      let isDisabled = await disonnectWallet()
      console.log(isDisabled)
      //navigate("/auth");
    } else navigate('/auth')

    //let isDisabled = await disonnectWallet();
  }

  return (
    <div className="navContainer">
      {newMsgVal && newMsgVal !== '' && (
        <>
          <Notification
            status={true}
            message={notificationMsg}
            closeNotification={closeNotification}
          />
          <ReactHowler src={Audio} playing={true} />
        </>
      )}
      {newTransactionVal && newTransactionVal !== '' && (
        <>
          <Notification
            status={true}
            message={notificationMsg}
            closeNotification={closeNotification}
          />
          <ReactHowler src={Audio} playing={true} />
        </>
      )}

      <nav className={props.className}>
        {Page === 'Landing' && (
          <Link to="/home" className="logoBox">
            <img src={Logo} alt="logo" />
          </Link>
        )}
        {Page !== 'Landing' && (
          <Link className="logoBox" to="/home">
            <img src={Logo} alt="logo" />
          </Link>
        )}
        <ul className="navMid">
          <a href="/#works">
            <li className="hvr-underline-from-left">How it works </li>
          </a>
          <a href="/#faq">
            {' '}
            <li className="hvr-underline-from-left">FAQs</li>
          </a>
          {props.className === 'navContentLanding' ? (
            <a href="mailto:support@buylistnft.com">
              <li className="hvr-underline-from-left">Contact us</li>
            </a>
          ) : (
            <Link to="/userLists">
              <li className="hvr-underline-from-left">Your lists</li>
            </Link>
          )}
        </ul>
        <div className="navRight">
          <div className="navSearch ">
            <input
              type="text"
              placeholder="Search project"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={Search} alt="search" />
          </div>
          {searchTerm.length >= 3 && searchRes.length < 1 && (
            <div className="animate__animated animate__fadeIn navSearchRes">
              <div className="nsr-content">
                <div className="nr-content">
                  <p>
                    Sorry, we dont seem to have this project in our library.
                  </p>
                  <Link to="/postProject" className="nsr-btm">
                    <span>Add it to your library</span>
                    <img src={Add} alt="add" />
                  </Link>
                </div>
              </div>
            </div>
          )}
          {searchTerm.length >= 3 && searchRes.length >= 1 && (
            <div className="animate__animated animate__fadeIn navSearchRes">
              <div className="nsr-content">
                {isLoading ? (
                  <div className="spotsLoading-sm">
                    <CircularProgress color="inherit" size="25px" />
                  </div>
                ) : (
                  <div className="sr-content">
                    {searchRes.map((result) => (
                      <Link
                        to={`/buySpot/${result.id}`}
                        className="sr-single"
                        key={result.id}
                      >
                        <p>{result.projectName}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* <Link to="/auth"> */}
          <button className="nav_Connect" onClick={handleConnect}>
            {currentAccount && props.className !== 'navContentLanding'
              ? 'Disconnect'
              : //: shortenAddress(currentAccount)
                'Connect '}
          </button>
          {/* </Link> */}
        </div>
      </nav>
    </div>
  )
}

export default NavWeb
