import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Arrow from "../../assets/icons/arrow1.svg";
import Metamask from "../../assets/icons/metamask.svg";
import Wc from "../../assets/icons/wc.png";
import Check from "../../assets/icons/checkmark.svg";
import { CircularProgress } from "@material-ui/core";

//import { TransactionContext } from "../../context/TransactionContext";
import UniContext from "../../context/UniContext";
import { AuthContext } from "../../context/AuthContext";
import {
  capitalizeFirstLetter,
  shortenAddress,
} from "../../utils/shortenAddress";
import { publicRequest } from "../../utils/requestMethods";
import { logger } from "../../utils/logger";

const Connect = () => {
  let navigate = useNavigate();

  const [currentScreen, setCurrentScreen] = useState("Connect");
  const [connected, setConnected] = useState(false);
  const [response, setResponse] = useState({
    error: "",
    success: "",
  });
  const {
    initSocketFromLogin,
    enableWalletConnect,
    connectToMetaMask,
    currentAccount,
  } = useContext(UniContext);
  //const { connectWallet, currentAccount } = useContext(TransactionContext);
  const [authState, setAuthState] = useContext(AuthContext);
  //const currentAccount = localStorage.getItem("currentAccount");

  const handlePrevScreen = () => {
    if (connected) {
      setConnected(false);
    } else {
      navigate("/");
    }
  };

  const handleLogin = async () => {
    if (currentAccount) {
      setAuthState({
        ...authState,
        isFetching: true,
      });
      setResponse({
        ...response,
        error: "",
      });
      try {
        const newUser = {
          walletAddress: currentAccount,
        };
        const loginReq = await publicRequest.post("auth/login", newUser);
        logger("REQ RESPONSE: ", loginReq);
        setAuthState({
          ...authState,
          user: loginReq.data,
          isFetching: false,
          error: false,
        });
        console.log(authState);
        initSocketFromLogin(loginReq.data.tokens.token);
        navigate("/home");
        //logger('REQ RESPONSE: ', authState.user)
      } catch (err) {
        setAuthState({
          ...authState,
          isFetching: false,
          error: true,
        });
        logger(" ERROR::: ", err);
        if (err.response.data.error === "user not found") {
          setResponse({
            error: "User not found, please signup",
            success: "",
          });
        } else {
          setResponse({
            error: err?.response.data.error,
            success: "",
          });
        }
      }
    }
  };

  const handleSubmit = async () => {
    setCurrentScreen("Signup");
  };

  return (
    <div className="connectContent">
      {currentScreen === "Connect" && (
        <>
          <div className="connectTop">
            <img onClick={handlePrevScreen} src={Arrow} alt="back" />
            <div className="coTop_txt">
              <h1>My wallet</h1>
              <p>
                Connect with one of our <span>wallet</span> providers
              </p>
            </div>
          </div>

          {!currentAccount && (
            <div className="connectBox">
              <div
                className="connectBtn"
                //onClick={() => setConnected(true)}
                onClick={connectToMetaMask}>
                <p>Metamask</p>
                <img className="metamaskIcon" src={Metamask} alt="metamask" />
              </div>
              <div
                className="connectBtn"
                //onClick={() => setConnected(true)}
                onClick={enableWalletConnect}>
                <p>WalletConnect</p>
                <img className="connectWallet" src={Wc} alt="metamask" />
              </div>
            </div>
          )}
          {currentAccount && (
            <div className="connectCompleteBx ">
              <img
                src={Check}
                alt=""
                className="animate__animated animate__zoomIn"
              />
              <p className="connectedtxt">
                Congratulations, You have connected your wallet, proceed to buy
                a whitelist spot
              </p>
              <div className="connectAdd">
                <p> {shortenAddress(currentAccount)}</p>
              </div>
            </div>
          )}
          <div className="loginBx">
            <button
              disabled={!currentAccount || authState.isFetching}
              onClick={handleSubmit}>
              {authState.isFetching ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                "Signup"
              )}
            </button>
          </div>
          {currentAccount && !authState.error && (
            <div className="coTop_txt2">
              <p>
                Already have an account?{" "}
                <span onClick={handleLogin}> login here</span>
              </p>
            </div>
          )}
          <p className="errorMsg">{capitalizeFirstLetter(response.error)}</p>
          <p>{response.success}</p>
        </>
      )}
      {currentScreen === "Signup" && <Signup />}
    </div>
  );
};

export default Connect;
