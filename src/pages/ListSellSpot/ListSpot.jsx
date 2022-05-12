import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useStateRef from 'react-usestateref'
import { CircularProgress } from '@material-ui/core'
//import { ShareSocial } from 'react-share-social'
import {
  // EmailShareButton,
  FacebookShareButton,
  // TelegramShareButton,
  // DiscordShareButton,
  TwitterShareButton,
  //WhatsappShareButton,
} from 'react-share'
import Facebook from '../../assets/icons/facebook.svg'
import Twitter from '../../assets/icons/twitter.svg'
//import Insta from "../../assets/icons/ig.svg";

import './ListSpot.scss'
//
import Saly from '../../assets/images/saly02.svg'
import Arrow from '../../assets/icons/arrow1.svg'
import Share from '../../assets/icons/share.svg'
//
import NavBar from '../../components/NavBar/NavBar'
import D1 from './components/Details1'
import D2 from './components/Details2'
import D3 from './components/Details3'
import Complete from './components/Complete'

import Active1 from '../../assets/icons/steps/active1.svg'
import Active2 from '../../assets/icons/steps/active2.svg'
import Active3 from '../../assets/icons/steps/active3.svg'
import Comp1 from '../../assets/icons/steps/comp1.svg'
import Comp2 from '../../assets/icons/steps/comp2.svg'
import Comp3 from '../../assets/icons/steps/comp3.svg'
import Unseen2 from '../../assets/icons/steps/unseen2.svg'
import Unseen3 from '../../assets/icons/steps/unseen3.svg'

import { TransactionContext } from '../../context/TransactionContext'
import UniContext from '../../context/UniContext'
import { userRequest } from '../../utils/requestMethods'
import { logger } from '../../utils/logger'

const ListSpot = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [step1, setStep1] = useState('active')
  const [step2, setStep2] = useState('unseen')
  const [step3, setStep3] = useState('unseen')
  const [file, setFile] = useState('')
  const [file2, setFile2] = useState('')
  const [inputs, setInputs] = useState({
    projectName: '',
    discordLink: '',
    twitterLink: '',
    mintPrice: '',
    mintToken: '',
    mintDate: '',
    discordId: '',
    twitterName: '',
    wlNumber: '', //
    wlPrice: '', //
  })
  const [response, setResponse] = useState({
    error: '',
    success: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [ev, setEv, evRef] = useStateRef([])
  const [newSpot, setNewSpot] = useState([])

  const {
    createSpotInContract,
    transactionLoading,
    createEthereumContract,
  } = useContext(TransactionContext)
  const { disonnectWallet } = useContext(UniContext)
  // const { newTransaction } = useContext(TransactionContext)
  //const [newTransactionVal, setNewTransactionVal] = newTransaction
  //const { currentAccount, createNewSpot } = useContext(UniContext);

  useEffect(() => {
    const onCreateSpotInContract = async () => {
      const transactionsContract = createEthereumContract()
      transactionsContract.on(
        'SpotStateChanged',
        (spotId, fromState, toState) => {
          const spotIdValue = spotId.toString()
          setEv({
            spotIdValue,
            fromState,
            toState,
          })
          // setTimeout(() => {
          //   setNewTransactionVal(evRef.current)
          // }, 1000)
          console.log(evRef.current.spotIdValue, evRef.current)
        },
      )
    }
    onCreateSpotInContract()
  }, [
    createEthereumContract,
    setEv,
    evRef,
    transactionLoading,
    isLoading,
    //setNewTransactionVal,
  ])

  const inputHandler = (event) => {
    const { name, value } = event.target
    if (name === 'mintPrice' || name === 'wlPrice') {
      let letters = /[a-zA-Z]/
      let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
      let dots = value.match(/\./g)
      console.log(dots)
      if (
        letters.test(value) ||
        specialChars.test(value) ||
        dots?.length >= 2 ||
        value.length > 12
      ) {
        console.log(value)
      } else {
        setInputs({
          ...inputs,
          [event.target.name]: value,
        })
      }
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
      })
    }
  }
  const fileHandler = (e) => {
    setFile(e.target.files[0])
  }
  const fileHandler2 = (e) => {
    setFile2(e.target.files[0])
  }

  const createSpotInDb = async () => {
    setIsLoading(true)
    setResponse({
      ...response,
      error: '',
    })
    try {
      let listDetails = new FormData()
      listDetails.append('id', evRef.current.spotIdValue)
      listDetails.append('projectName', inputs.projectName)
      listDetails.append('mintPrice', inputs.mintPrice)
      listDetails.append('mintDate', inputs.mintDate)
      listDetails.append('mintToken', inputs.mintToken)
      listDetails.append('discordChannel', inputs.discordLink)
      listDetails.append('userDiscordId', inputs.discordId)
      listDetails.append('twitterPage', inputs.twitterLink)
      listDetails.append('twitterUsername', inputs.twitterName)
      listDetails.append('whiteListPrice', inputs.wlPrice)
      listDetails.append('twitterShot', file, file.name)
      listDetails.append('discordShot', file2, file2.name)

      // const listDetails = {
      //   projectName: inputs.projectName,
      //   mintPrice: inputs.mintPrice,
      //   mintDate: inputs.mintDate,
      //   discordChannel: inputs.discordLink,
      //   userDiscordId: inputs.discordId,
      //   twitterPage: inputs.twitterLink,
      //   twitterUsername: inputs.twitterName,
      //   //twitterShot: twitterShot,
      //   whiteListNo: evRef.current,
      //   whiteListPrice: inputs.wlPrice, // less than half of mint Price
      // }

      logger(listDetails)
      const createSpotInDBReq = await userRequest.post(
        'spot/create',
        listDetails,
      )
      logger('REQ RESPONSE: ', createSpotInDBReq)
      setNewSpot(createSpotInDBReq.data)
      setIsLoading(false)
      setStep3('complete')
    } catch (err) {
      logger(' ERROR::: ', err)
      setResponse({
        error: err?.response?.data?.error || 'Sorry, something went wrong.',
        success: '',
      })
      setIsLoading(false)
      if (err?.response?.data?.error === 'token no longer valid') {
        //
      }
    }
  }

  const createListSpot = async () => {
    if (inputs.wlPrice < inputs.mintPrice / 2) {
      const inContract = await createSpotInContract(inputs)
      if (inContract.code !== 4001) {
        setIsLoading(true)
        //await createSpotInDb();
        setTimeout(async () => {
          await createSpotInDb()
          setIsLoading(false)
        }, 2500)
        console.log('Success')
        setResponse({
          error: '',
          success: '',
        })
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setResponse({
        error: "Price must be below half of the project's mint price",
        success: '',
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step1 === 'active') {
      //verifications

      let link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      let link2 = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      console.log(link.test(inputs.discordLink))
      console.log(link.test(inputs.twitterLink))
      console.log(inputs.twitterLink)
      if (link.test(inputs.twitterLink) && link2.test(inputs.discordLink)) {
        setResponse({
          ...response,
          error: '',
        })
        setStep1('complete')
        setStep2('active')
      } else {
        setResponse({
          ...response,
          error: 'Please enter a valid url ( include "https://" )',
        })
      }
    }
    if (step2 === 'active') {
      setStep2('complete')
      setStep3('active')
    }
    if (step3 === 'active') {
      createListSpot()
    }
  }
  const handleBack = (e) => {
    e.preventDefault()
    if (step2 === 'active') {
      setStep2('unseen')
      setStep1('active')
    }
    if (step3 === 'active') {
      setStep3('unseen')
      setStep2('active')
    }
    if (step3 === 'complete') {
      setStep3('active')
      logger(ev)
    }
  }

  return (
    <>
      <NavBar className="navContent" />
      <div className="lsContainer">
        <div className="lsContent">
          <div className="lsLeft">
            <div className="lsImg">
              <motion.img
                src={Saly}
                alt="illustration"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    //scale: 0.4,
                    y: 100,
                    opacity: 0,
                    rotate: -30,
                  },
                  visible: {
                    //scale: 1,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    transition: {
                      duration: 0.5,
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="lsRight">
            <form className="lsBox" onSubmit={handleSubmit}>
              <div className="lsBox-Top">
                <div className="lsb-title">
                  <Link to="/listOptions">
                    <img src={Arrow} alt="back" />
                  </Link>
                  <h1>Post A Sell Ad</h1>
                </div>
                <div className="animate__animated animate__fadeIn lsb-nav">
                  <img
                    src={step1 === 'active' ? Active1 : Comp1}
                    alt="step one"
                  />
                  <div></div>
                  <img
                    src={
                      step2 === 'unseen'
                        ? Unseen2
                        : step2 === 'active'
                        ? Active2
                        : Comp2
                    }
                    alt="step two"
                  />
                  <div></div>
                  <img
                    src={
                      step3 === 'unseen'
                        ? Unseen3
                        : step3 === 'active'
                        ? Active3
                        : Comp3
                    }
                    alt="step three"
                  />
                </div>
                <div className="ld-title">
                  <h2>
                    {step1 === 'active'
                      ? 'NFT project details'
                      : step2 === 'active'
                      ? 'User details'
                      : step3 === 'active'
                      ? 'Pricing'
                      : 'Spot uploaded!'}
                  </h2>
                </div>
              </div>
              {step1 === 'active' && (
                <D1
                  projectName={inputs.projectName}
                  discordLink={inputs.discordLink}
                  twitterLink={inputs.twitterLink}
                  mintPrice={inputs.mintPrice}
                  mintToken={inputs.mintToken}
                  mintDate={inputs.mintDate}
                  inputHandler={inputHandler}
                />
              )}
              {step2 === 'active' && (
                <D2
                  discordId={inputs.discordId}
                  twitterName={inputs.twitterName}
                  inputHandler={inputHandler}
                  fileHandler={fileHandler}
                  fileHandler2={fileHandler2}
                  file={file}
                  file2={file2}
                />
              )}
              {step3 === 'active' && (
                <D3
                  wlNumber={inputs.wlNumber}
                  wlPrice={inputs.wlPrice}
                  inputHandler={inputHandler}
                  response={response}
                />
              )}
              {step3 === 'complete' && <Complete singleSpot={newSpot} />}

              {step3 !== 'complete' && (
                <>
                  <div className="ls-btns">
                    <button
                      onClick={handleBack}
                      className={`${
                        step1 === 'active' ? 'opaque' : 'ls-btn-b'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      //onClick={handleSubmit}
                      type="submit"
                      className="ls-btn-s"
                      disabled={transactionLoading || isLoading}
                    >
                      {isLoading || transactionLoading ? (
                        <CircularProgress color="inherit" size="25px" />
                      ) : (
                        'Save'
                      )}
                    </button>
                  </div>
                  <div className="errorDesc3 animate__animate animate__fadeIn">
                    {/* <img src={Alert} alt="alert" /> */}
                    <p>{response.error} </p>
                  </div>
                </>
              )}
              {step3 === 'complete' && (
                <>
                  <div className="ls-share">
                    <img src={Share} alt="share" />
                    <p>Share this spot on social media</p>
                  </div>
                  <div className="ls-socials">
                    <TwitterShareButton
                      url={`https://buylistnft.com/buySpot/${newSpot.id}`}
                    >
                      <img src={Twitter} alt="twitter" />
                    </TwitterShareButton>
                    {/* <DiscordShareButton
                      url={`https://buylistnft.com/buySpot/${newSpot.id}`}
                    >
                      <img src={Insta} alt="IG" />
                    </DiscordShareButton> */}
                    <FacebookShareButton
                      url={`https://buylistnft.com/buySpot/${newSpot.id}`}
                    >
                      <img src={Facebook} alt="Facebook" />
                    </FacebookShareButton>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListSpot
