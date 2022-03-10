import React, { useEffect, useState } from "react";
//import { useNavigate } from 'react-router-dom'
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { approveABI, approveAddress } from "../utils/constants";
//import { userRequest } from '../utils/requestMethods'
import { logger } from "../utils/logger";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  ); // 3 tools to etch contract
  return transactionsContract;
};

const createApproveContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const approvalContract = new ethers.Contract(
    approveAddress,
    approveABI,
    signer
  ); // // 3 tools to etch contract
  return approvalContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactionLoading, setTransactionLoading] = useState(false);
  //const [contractListened, setContractListened] = useState()

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      localStorage.setItem("currentAccount", accounts[0]);
      setCurrentAccount(localStorage.getItem("currentAccount"));
    } catch (error) {
      logger(error);

      throw new Error("No ethereum object");
    }
  };

  const createSpotInContract = async (inputs) => {
    try {
      setTransactionLoading(true);
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const newSpot = await transactionsContract.create(
          inputs.wlPrice,
          inputs.mintPrice
        );
        setTransactionLoading(true);
        await newSpot.wait();
        //logger(newSpot)
        setTransactionLoading(false);
        return newSpot;
      } else {
        logger("No eth Object");
      }
    } catch (err) {
      logger(err);
      setTransactionLoading(false);
      return err;
    }
  };

  const initiateBuy = async (spotId) => {
    try {
      setTransactionLoading(true);
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        //const approvalContract = createApproveContract();
        //approvalContract.approve(contractAddress, "100");
        const buySpot = await transactionsContract.initiateBuy(spotId);

        await buySpot.wait();
        logger(buySpot);
        setTransactionLoading(false);
        return buySpot;
      }
    } catch (err) {
      logger(err);
      setTransactionLoading(false);
      return err;
    }
  };

  const approveSpend = async (input) => {
    try {
      //setTransactionLoading(true)
      if (ethereum) {
        const approvalContract = createApproveContract();
        const approvePayment = await approvalContract.approve(
          contractAddress,
          input
        );
        await approvePayment.wait();
        //console.log(approvePayment);
        console.log(currentAccount.balance);
        setTransactionLoading(false);
        return approvePayment;
      }
    } catch (err) {
      logger(err);
      setTransactionLoading(false);
      return err;
    }
  };

  // const approveTransaction = async (spotId) => {
  //   try{
  //     setTransactionLoading(true)
  //     if (ethereum) {
  //       const transactionsContract = createEthereumContract()
  //       const approvePayment = await transactionsContract.approvePayment(
  //        spotId
  //       )
  //       await approvePayment.wait()
  //       logger(approvePayment)
  //       setTransactionLoading(false)
  //       return approvePayment
  //     }
  //   }catch (err) {
  //     logger(err)
  //     setTransactionLoading(false)
  //     return err
  //   }
  // }

  useEffect(() => {
    const onWalletChange = async () => {
      ethereum.on("accountsChanged", async (accounts) => {
        //setCurrentAccount(accounts[0])
        localStorage.setItem("currentAccount", accounts[0]);
        setCurrentAccount(localStorage.getItem("currentAccount"));
        //logger(accounts[0])
        if (accounts[0] === undefined) {
          try {
            // const logOutReq = await userRequest.post('user/logout')
            // logger('REQ RESPONSE: ', logOutReq)
            localStorage.removeItem("user");
            localStorage.removeItem("currentAccount");
            window.location = "/auth";
          } catch (err) {
            logger(err);
          }
        }
      });
    };
    onWalletChange();

    // const oncreateSpotInContract = async () => {
    //   const transactionContract = createEthereumContract()
    //   transactionContract.on(
    //     'SpotStateChanged',
    //     (spotId, fromState, toState) => {
    //       const spotIdValue = Number(spotId)
    //       setEv({
    //         spotIdValue,
    //         fromState,
    //         toState,
    //       })
    //     },
    //   )
    //   // setContractListened(transactionContract)
    //   // return () => {
    //   //   contractListened.removeAllListeners()
    //   // }
    //   logger(ev)
    // }
    // oncreateSpotInContract()
  }, [currentAccount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        createEthereumContract,
        currentAccount,
        createSpotInContract,
        transactionLoading,
        approveSpend,
        initiateBuy,
        //approveTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
