import { useState, useEffect, useContext } from 'react'
import useStateRef from 'react-usestateref'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import './BuySpot.scss'
import NavBar from '../../components/NavBar/NavBar'

import { CircularProgress } from '@material-ui/core'
import { publicRequest, userRequest } from '../../utils/requestMethods'
//import { logger } from "../../utils/logger";

import Arrow from '../../assets/icons/arrow1.svg'
import Alert from '../../assets/icons/alert.svg'
import Buy from './components/Buy'
import Pay from './components/Pay'
//import Transaction from "./components/Transaction";
import PayComplete from './components/PayComplete'
import SaleComplete from '../SellSpot/SellSpotx'

import { TransactionContext } from '../../context/TransactionContext'
//import UniContext from "../../context/UniContext";
import { AuthContext } from '../../context/AuthContext'

const BuySpot = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const spotId = useParams().spotId
  const [step, setStep] = useState(1)
  const [singleSpot, setSingleSpot] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingTr, setIsLoadingTr] = useState(false)
  //const [errMsg, setErrMsg, errMsgRef] = useState("");
  const [errMsg, setErrMsg] = useState('')
  const [newTransaction, setNewTransaction] = useState()
  //const [ev, setEv, evRef] = useStateRef([]);

  const {
    approveSpend,
    initiateBuy,
    //transactionLoading,
    //createEthereumContract,
  } = useContext(TransactionContext)
  const [authState] = useContext(AuthContext)
  //const { initiateBuy } = useContext(UniContext);
  const hasPaidOneTimeFee = authState.user.hasPaidOneTimeFee

  let navigate = useNavigate()

  useEffect(() => {
    const getSpot = async () => {
      try {
        const spotsReq = await publicRequest.get(`spot/single?id=${spotId}`)
        console.log('REQ RESPONSE: ', spotsReq.data)
        setSingleSpot(spotsReq.data)
        setIsLoading(false)
      } catch (err) {
        console.log(' ERROR::: ', err)
      }
    }
    getSpot()
  }, [spotId])

  const storeTransaction = async () => {
    if (errMsg === '') {
      try {
        setIsLoadingTr(true)
        const id = {
          spotId,
        }
        const saveReq = await userRequest.post('transaction/create', id)
        console.log(saveReq)
        console.log(saveReq.data.id)
        setNewTransaction(saveReq.data.id)
        localStorage.setItem('currentTransactionId', saveReq.data.id)
        setIsLoadingTr(false)
        console.log('transacttion created')
        //setStep(step + 1);
      } catch (err) {
        console.log(err)
        setIsLoadingTr(false)
        //setErr(err.data)
      }
    }
  }

  const handleBuy = async () => {
    try {
      setIsLoadingTr(true)
      const buy = await initiateBuy(spotId)
      console.log('buy object >>>>', buy)
      if (buy.code === -32603) {
        setIsLoadingTr(false)
        setErrMsg(buy.data.message)
      } else if (
        buy?.message?.search('User denied transaction signature') >= 1
      ) {
        setIsLoadingTr(false)
        setErrMsg(buy.message)
      } else {
        setIsLoadingTr(false)
        if (errMsg === '') {
          localStorage.setItem('spotToBuy', JSON.stringify(singleSpot))
          await storeTransaction()
          setStep(step + 1)
          //setErrMsg("");
        }
      }
    } catch (err) {
      console.log(err)
      setIsLoadingTr(false)
      setErrMsg(err?.data?.message)
    }
    setIsLoadingTr(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step === 1) {
      setIsLoadingTr(true)
      if (!hasPaidOneTimeFee) {
        const approve = await approveSpend(
          Number(singleSpot.whiteListPrice) * 1000000 + 20000000,
        )
        if (approve.code !== 4001) {
          if (!isLoadingTr) {
            setStep(step + 1)
          }
          setIsLoadingTr(false)
        } else {
          setIsLoadingTr(false)
        }
      } else {
        const approve = await approveSpend(
          Number(singleSpot.whiteListPrice) * 1000000,
        )
        if (approve.code !== 4001) {
          if (!isLoadingTr) {
            setStep(step + 1)
          }
          setIsLoadingTr(false)
        } else {
          setIsLoadingTr(false)
        }
      }
    }
    if (step === 2) {
      handleBuy()
    }
    if (step === 3) {
      // redirect
      localStorage.setItem('spotToBuy', JSON.stringify(singleSpot))
      navigate(`/releaseFunds/${newTransaction}`)
      console.log(newTransaction)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else if (step === 1) {
      navigate('/home')
    }
  }
  console.log(newTransaction)

  return (
    <>
      <NavBar className="navContent" />
      <div className="bsContainer">
        {isLoading ? (
          <div className="spotsLoading">
            <CircularProgress color="inherit" size="65px" />
          </div>
        ) : (
          <div className="bsContent">
            {singleSpot && (
              <form className="bsBox">
                <div className="bsBox-Top">
                  <div className="bsb-title">
                    {/* <Link to="/home"> */}
                    <img src={Arrow} alt="back" onClick={handleBack} />
                    {/* </Link> */}
                    <h1>
                      {step === 1
                        ? 'Buy whitelist spot'
                        : step === 2
                        ? 'Pay to Escrow'
                        : step === 3
                        ? 'Pay to Escrow'
                        : step === 4
                        ? 'Buy whitelist spot'
                        : 'Buy whitelist spot'}
                    </h1>
                  </div>
                </div>
                {step === 1 ? (
                  <Buy singleSpot={singleSpot} />
                ) : step === 2 ? (
                  <Pay singleSpot={singleSpot} />
                ) : step === 3 ? (
                  <PayComplete singleSpot={singleSpot} />
                ) : (
                  <SaleComplete singleSpot={singleSpot} />
                )}

                <div className="bsBtn">
                  {isLoadingTr && (
                    <button onClick={handleSubmit} disabled={true}>
                      <CircularProgress color="inherit" size="25px" />
                    </button>
                  )}
                  {!isLoadingTr && (
                    <button onClick={handleSubmit}>
                      {step === 1
                        ? 'Buy'
                        : step === 2
                        ? 'Complete payment'
                        : step === 3
                        ? 'Proceed to chat'
                        : step >= 4
                        ? 'Release funds'
                        : 'Release funds'}
                    </button>
                  )}
                  {errMsg !== '' && (
                    <div className="errorDesc2 animate__animate animate__fadeIn">
                      <img src={Alert} alt="alert" />
                      <p>{errMsg}</p>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default BuySpot
