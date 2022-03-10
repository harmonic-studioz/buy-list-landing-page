import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Arrow from "../../assets/icons/arrow1.svg";
import Metamask from "../../assets/icons/metamask.svg";
import Wc from "../../assets/icons/wc.png";
import Check from "../../assets/icons/checkmark.svg";
import { CircularProgress } from "@material-ui/core";

import { TransactionContext } from "../../context/TransactionContext";
import { AuthContext } from "../../context/AuthContext";
import { shortenAddress } from "../../utils/shortenAddress";
import { publicRequest } from "../../utils/requestMethods";
import { logger } from "../../utils/logger";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import useWalletConnect from "../../hooks/walletConnect";
import UniContext from "../../context/UniContext";

const Connect = () => {
  let navigate = useNavigate();
  const { enableWalletConnect, connectToMetaMask } = useContext(UniContext);
  const [currentScreen, setCurrentScreen] = useState("Connect");
  const [connected, setConnected] = useState(false);
  const [response, setResponse] = useState({
    error: "",
    success: "",
  });
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const [authState, setAuthState] = useContext(AuthContext);

  const handlePrevScreen = () => {
    if (connected) {
      setConnected(false);
    } else {
      navigate("/");
    }
  };

  // const connectWalletFunc = async () => {
  //   // Using Wallet Connect
  //   try {
  //     const providerOptions = {
  //       walletconnect: {
  //         package: WalletConnectProvider, // required
  //         options: {
  //           infuraId: "INFURA_ID", // required
  //         },
  //       },
  //     };
  //     const web3Modal = new Web3Modal({
  //       //network: "mainnet", // optional
  //       cacheProvider: true, // optional
  //       providerOptions, // required
  //     });
  //     const provider = await web3Modal.connectTo("walletconnect");
  //     // eslint-disable-next-line
  //     const web = new Web3(provider);
  //     //resolve(web)
  //     setConnected(true);
  //     console.log(web.accounts[0]);
  //   } catch (err) {
  //     console.log(err);
  //     //console.log(web)
  //   }

  //   // const EnableWalletConnect = () => {
  //   //   return new Promise(async (reject, resolve) => {
  //   //     try {
  //   //       const provider = new WalletConnectProvider({
  //   //         infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  //   //       });
  //   //       await provider.enable();
  //   //       const web3 = new Web3(provider);
  //   //       resolve(web3);
  //   //     } catch (error) {
  //   //       reject(error);
  //   //     }
  //   //   });
  //   // };
  // };

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
                //onClick={metamaskConnect}
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
            <div className="connectCompleteBx animate__animated animate__zoomIn">
              <img src={Check} alt="" />
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

          <p className="errorMsg">{response.error}</p>
          <p>{response.success}</p>
        </>
      )}
      {currentScreen === "Signup" && <Signup />}
    </div>
  );
};

export default Connect;
