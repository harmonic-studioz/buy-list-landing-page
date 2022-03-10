import { useState, useContext } from 'react'
import TextInput from '../../components/Inputs/TextInput'

import Arrow from '../../assets/icons/arrow1.svg'
import Connect from './Connect'
import { TransactionContext } from '../../context/TransactionContext'
import { AuthContext } from '../../context/AuthContext'
import { publicRequest } from '../../utils/requestMethods'
import { logger } from '../../utils/logger'
import { CircularProgress } from '@material-ui/core'
import { capitalizeFirstLetter } from '../../utils/shortenAddress'

const Signup = () => {
  const [currentScreen, setCurrentScreen] = useState('Signup')
  const [userInput, setUserInput] = useState({
    email: '',
    username: '',
  })
  const [response, setResponse] = useState({
    error: '',
    success: '',
  })
  const { currentAccount } = useContext(TransactionContext)
  const [authState, setAuthState] = useContext(AuthContext)

  const inputHandler = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setAuthState({
      ...authState,
      isFetching: true,
    })
    setResponse({
      ...response,
      error: '',
    })
    try {
      const newUser = {
        username: userInput.username,
        email: userInput.email,
        walletAddress: currentAccount,
      }
      const signupReq = await publicRequest.post('auth/create-account', newUser)
      logger('REQ RESPONSE: ', signupReq)
      setAuthState({
        ...authState,
        isFetching: false,
        error: false,
      })
       //navigate('/auth/verify')
    } catch (err) {
      setAuthState({
        ...authState,
        isFetching: false,
        error: false,
      })
      logger(' ERROR::: ', err)
      setResponse({
        error: err?.response.data.error,
        success: '',
      })
    }
  }

  return (
    <>
      {currentScreen === 'Signup' ? (
        <>
          <div className="connectTop">
            <img
              onClick={() => setCurrentScreen('Connect')}
              src={Arrow}
              alt="back"
            />
            <div className="coTop_txt ">
              <h1>Quickly setup your profile</h1>
              <p>Help us get back to you easily, register here:</p>
            </div>
          </div>
          <div className="connectInputs">
            <TextInput
              type="email"
              label="Email"
              PH="email"
              inputName="email"
              inputHandler={inputHandler}
              value={userInput.email}
            />
            <TextInput
              type="text"
              label="Username"
              PH="username"
              inputName="username"
              inputHandler={inputHandler}
              value={userInput.username}
            />
          </div>
          <div className="loginBx ">
            <button
              disabled={authState.isFetching}
              onClick={handleSubmit}
              type="submit"
            >
              {authState.isFetching ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                'Save'
              )}
            </button>
          </div>
          <p className="errorMsg">{capitalizeFirstLetter(response.error)}</p>
        </>
      ) : (
        <Connect />
      )}
    </>
  )
}

export default Signup
