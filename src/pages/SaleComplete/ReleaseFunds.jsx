import { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import AcceptBtn from '../../components/AcceptBtn/AcceptBtn'
import Arrow from '../../assets/icons/arrow1.svg'
import './SaleComplete.scss'
import { CircularProgress } from '@material-ui/core'
import Transaction from '../BuySpot/components/Transaction'
import Modal01 from '../../components/Modals/Modal1'
import ChatIcon from '../../assets/icons/chat.svg'
import { TransactionContext } from '../../context/TransactionContext'
import { AuthContext } from '../../context/AuthContext'
import { userRequest, publicRequest } from '../../utils/requestMethods'
import Alert from '../../assets/icons/alert.svg'

const ReleaseFunds = () => {
  const [authState] = useContext(AuthContext)
  const userId = authState.user.id
  console.log('currentUser', userId)
  const scrollRef = useRef()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [chatView, setChatView] = useState(true)
  const [complete, setComplete] = useState(false)
  const singleSpot = JSON.parse(localStorage.getItem('spotToBuy'))
  const spotId = singleSpot.id || localStorage.getItem('spotIdValue')
  //const [singleSpot, setSingleSpot] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { approvePay } = useContext(TransactionContext)
  const [err, setErr] = useState('')
  const [chatMessage, setChatMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [count, setCount] = useState(1)
  const [accepted, setAccepted] = useState(false)
  //const transactionId = localStorage.getItem("currentTransactionId");
  const transactionId = useParams().transactionId
  const { newTransaction, newMsg } = useContext(TransactionContext)

  const [newMsgVal, setNewMsgVal] = newMsg
  const [newTransactionVal, setNewTransactionVal] = newTransaction

  useEffect(() => {
    const getSpot = async () => {
      try {
        const spotsReq = await publicRequest.get(
          `spot/single?id=${singleSpot.id}`,
        )
        console.log('REQ RESPONSE: ', spotsReq.data)
        // setSingleSpot(spotsReq.data)
        setIsLoading(false)
      } catch (err) {
        console.log(' ERROR::: ', err)
      }
    }
    getSpot()
  }, [])
  const storeRelease = async () => {
    try {
      setIsLoading(true)
      const id = {
        //id: singleSpot.id,
        id: singleSpot?.id,
      }
      if (err === '') {
        const saveReq = await userRequest.post('transaction/release-fund', id)
        console.log(saveReq)

        setIsLoading(false)
        //setComplete(true);
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      //setErr(err.data)
    }
  }

  const handleRelease = async () => {
    try {
      setIsLoading(true)
      const release = await approvePay(singleSpot?.id)
      console.log(release)
      if (release.code === -32603) {
        setErr('Sorry an error occured.')
        setErr(release.data.message)
      } else {
        if (err === '') {
          await storeRelease()
        }
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setComplete(true)
    }
  }

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const loadReq = await userRequest.get(
          `chat?transactionId=${transactionId}`,
        )
        console.log(loadReq.data)
        setMessages(loadReq.data)
      } catch (err) {
        console.log(err)
      }
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    loadMessages()
  }, [transactionId, count, newMsgVal, newTransactionVal])

  const handleDispute = () => {}

  const handleSubmit = async (event) => {
    event.preventDefault()
    // eslint-disable-next-line
    const release = await handleRelease()
    // eslint-disable-next-line
    const save = await storeRelease()
  }

  const sendMessage = async () => {
    if (chatMessage) {
      try {
        const details = {
          text: chatMessage,
          transactionId,
        }
        const sendReq = await userRequest.post('chat', details)
        console.log(sendReq)
        setMessages([...messages, sendReq.data])
        setChatMessage('')
        setCount(count + 1)
      } catch (err) {
        console.log(err)
      }
    }
  }
  const handleClose = () => {
    setComplete(false)
  }

  return (
    <>
      <NavBar className="navContent" />
      {chatView === false ? (
        <div className=" animate__animated animate__fadeIn bsContainer ">
          <div className="bsContent">
            <form className="bsBox" onSubmit={handleSubmit}>
              <div className="bsBox-Top">
                <div className="bsb-title">
                  <Link to="/home">
                    <img src={Arrow} alt="back" />
                  </Link>
                  <h1>Buy whitelist Spot</h1>
                  <div className="chatIcBox">
                    <img
                      onClick={() => setChatView(!chatView)}
                      src={ChatIcon}
                      alt="chat"
                    />
                  </div>
                </div>
              </div>
              <Transaction singleSpot={singleSpot} />
              <div className="bsBtn">
                <div className="bs-confirm">
                  <AcceptBtn onClick={() => setAccepted(!accepted)} />
                  {singleSpot?.user.id !== userId ? (
                    <p>I have confirmed whitelist spot</p>
                  ) : (
                    <p>I have updated the whitelist spot</p>
                  )}
                </div>
                <button
                //type="submit"
                //onClick={handleSubmit}
                //</div>onClick={handleRelease}
                //disabled={!accepted}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size="25px" />
                  ) : (
                    'Release funds'
                  )}
                </button>
                {err !== '' && (
                  <div className="errorDesc2 animate__animate animate__fadeIn">
                    <img src={Alert} alt="alert" />
                    <p>{err} </p>
                  </div>
                )}
              </div>
              <div className="bsDisp" onClick={handleDispute}>
                <p>Open dispute</p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="animate__animated animate__fadeIn bsContainer">
          <div className="bsContent2">
            <form className="bsBox" onSubmit={handleSubmit}>
              <div className="bsBox-Top">
                <div className="bsb-title">
                  <Link to="/home">
                    <img src={Arrow} alt="back" />
                  </Link>
                  <h1>Buy whitelist Spot</h1>
                  <div className="chatIcBox">
                    {!chatView && (
                      <img
                        onClick={() => setChatView(!chatView)}
                        src={ChatIcon}
                        alt="chat"
                      />
                    )}
                  </div>
                </div>
              </div>
              <Transaction singleSpot={singleSpot} />
              <div className="bs-confirm">
                <AcceptBtn />
                <p>I have confirmed whitelist spot</p>
              </div>

              <div className="bsBtn">
                <button
                  disabled={isLoading}
                  //</div>onClick={handleSubmit}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size="25px" />
                  ) : (
                    'Release funds'
                  )}
                </button>
                {err !== '' && (
                  <div className="errorDesc2 animate__animate animate__fadeIn">
                    <img src={Alert} alt="alert" />
                    <p>{err} </p>
                  </div>
                )}
              </div>

              <div className="bsDisp">
                <p>Open dispute</p>
              </div>
            </form>
            <div className="sc-chatBox">
              <div className="sc-chatContent">
                <div className="scc-top">
                  <h2>Chat</h2>
                  <img
                    onClick={() => setChatView(!chatView)}
                    src={ChatIcon}
                    alt="chat"
                  />
                </div>
                <div className="scc-body">
                  {messages.map((msg) => (
                    <>
                      {msg.senderId === userId ? (
                        <div
                          className="receiveContent"
                          key={msg.id}
                          ref={scrollRef}
                        >
                          <div className="receiveBox">
                            <p> {msg.text}</p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="sentContent"
                          key={msg.id}
                          ref={scrollRef}
                        >
                          <div className="sentBox">
                            <p> {msg.text}</p>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                  {/* {messages.map(
                    (msg) =>
                      msg.id === userId && (
                        <div className="sentContent">
                          <div className="sentBox">
                            <p> {msg.text}</p>
                          </div>
                        </div>
                      )
                  )} */}
                </div>
                <div className="scc-bottom">
                  <div className="scc-inputBox">
                    <input
                      type="text"
                      placeholder="Type message here"
                      onChange={(e) => setChatMessage(e.target.value)}
                      value={chatMessage}
                      // onKeyPress={(event) =>
                      //   event.key === "Enter" ? sendMessage : null
                      // }
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault()
                          sendMessage()
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {complete && (
        <Modal01
          message={
            'Congratulations, you have bought WL spot #' +
            singleSpot?.id +
            ' on ' +
            singleSpot.projectName
          }
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default ReleaseFunds
