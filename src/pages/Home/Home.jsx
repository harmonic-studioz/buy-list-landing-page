import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.scss'
import NavBar from '../../components/NavBar/NavBar'
import Container from '../../components/Container/Container'
import Hero from './components/Hero3'
import Spots from './components/Spots'
import Footer from '../../components/Footer/Footer'
import { CircularProgress } from '@material-ui/core'

import { publicRequest } from '../../utils/requestMethods'
import { logger } from '../../utils/logger'
import { TransactionContext } from '../../context/TransactionContext'
import { AuthContext } from '../../context/AuthContext'

import Notification from '../../components/Modals/Notification2'
import ReactHowler from 'react-howler'
import Audio from '../../assets/sound/alert.mp3'

const Home = () => {
  const navigate = useNavigate()
  const [activeSpots, setActiveSpots] = useState([])
  const [activeCollections, setActiveCollections] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [authState, setAuthState] = useContext(AuthContext)
  const [currentUserName, setCurrentUserName] = useState('')
  const [transactionAlert, setTransactionAlert] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState('')

  const { newTransaction, newMsg } = useContext(TransactionContext)

  const [newMsgVal, setNewMsgVal] = newMsg
  const [newTransactionVal, setNewTransactionVal] = newTransaction

  useEffect(() => {
    console.log(newTransactionVal)
    if (newTransactionVal) {
      setNotificationMsg(
        `Payment has been made for wl #${newTransactionVal?.spotIdValue}`,
      )
      setTransactionAlert(true)
      // if (newTransactionVal.status === 0) {
      //   setNotificationMsg(
      //     `Payment has been made for wl #${newTransactionVal?.spotIdValue}`,
      //   )
      //   localStorage.setItem(
      //     'currentTransactionId',
      //     newTransactionVal?.transactionId,
      //   )
      // } else if (newTransactionVal.status === 1) {
      //   setNotificationMsg(
      //     `wl #${newTransactionVal?.spotIdValue} has been approved`,
      //   )
      // } else if (newTransactionVal.status === 2) {
      //   setNotificationMsg(
      //     `wl #${newTransactionVal?.spotIdValue} has been sold!`,
      //   )
      // }
    }

    if (newMsgVal) {
      setNotificationMsg(`New chat message: "${newMsgVal?.text}"`)
      localStorage.setItem('currentTransactionId', newMsgVal?.transactionId)
      setTransactionAlert(true)
    }
  }, [newTransactionVal, newMsgVal])

  const closeNotification = () => {
    setNewTransactionVal()
    setNewMsgVal()
    setTransactionAlert(false)
    if (newTransactionVal) {
      navigate(`/saleComplete/${newTransactionVal?.transactionId}`)
    }
    if (newMsgVal) {
      navigate(`/saleComplete/${newMsgVal?.transactionId}`)
    }
    // prompt("working");
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setCurrentUserName(authState.user.username)
    const getActiveSpots = async () => {
      try {
        const spotsReq = await publicRequest.get('spot/get-spots?limit=4')
        logger('REQ RESPONSE: ', spotsReq.data.result)
        //console.log(spotsReq.data.result[0].username);
        console.log(currentUserName)
        setActiveSpots(spotsReq.data.result)
        setIsLoading(false)
      } catch (err) {
        logger(' ERROR::: ', err)
        setIsLoading(false)
      }
    }
    getActiveSpots()
    const getCollections = async () => {
      try {
        const spotsReq = await publicRequest.get('projects/get-projects')
        //logger("REQ RESPONSE: ", spotsReq.data.result);
        setActiveCollections(spotsReq.data.result)
        setIsLoading(false)
      } catch (err) {
        logger(' ERROR::: ', err)
      }
    }
    getCollections()
  }, [])

  return (
    <>
      <NavBar className="navContent" />
      {/* {(newTransactionVal && newTransactionVal !== '') ||
        (newMsgVal && newMsgVal !== '' && (
          <Notification
            status={transactionAlert}
            message={notificationMsg}
            closeNotification={closeNotification}
          />
        ))}
      {(newTransactionVal && newTransactionVal !== '') ||
        (newMsgVal && newMsgVal !== '' && (
          <ReactHowler src={Audio} playing={true} />
        ))} */}
      <Hero />
      <Container>
        {isLoading ? (
          <div className="spotsLoading">
            <CircularProgress color="inherit" size="65px" />
          </div>
        ) : (
          activeSpots.length >= 1 && (
            //activeSpots[0].username !== currentUserName &&
            <Spots
              currentUserName={currentUserName}
              activeSpots={activeSpots}
              title="Whitelist Pool"
              type="regular"
              screen="less"
            />
          )
        )}
        {activeSpots.length < 1 && !isLoading && (
          <div className="spotsLoading">
            <p> No available spots in whitelist pool...</p>
          </div>
        )}
        {isLoading ? (
          <div className="spotsLoading">
            <CircularProgress color="inherit" size="65px" />
          </div>
        ) : (
          activeCollections.length >= 1 && (
            <Spots
              activeSpots={activeCollections}
              title="Upcoming NFT Collections"
              type="monitor"
              screen="less"
            />
          )
        )}

        <Footer />
      </Container>
    </>
  )
}

export default Home
