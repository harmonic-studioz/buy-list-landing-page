import React, { useState } from "react";
import { ethers } from "ethers";
// import { contractABI, contractAddress } from "../utils/constants";
// import { approveABI, approveAddress } from "../utils/constants";
import { usdc as usdcAbi } from "../utils/abi";
import { usdc as usdcCon } from "../utils/contracts";
import { master as masterContract } from "../utils/contracts";
import { master as masterAbi } from "../utils/abi";
//import { userRequest } from '../utils/requestMethods'
import { logger } from "../utils/logger";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    masterContract,
    masterAbi,
    signer
  );
  return transactionsContract;
};

const createApproveContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const approvalContract = new ethers.Contract(usdcCon, usdcAbi, signer);
  return approvalContract;
};

export const TransactionsProvider = ({ children }) => {
  // const [currentAccount, setCurrentAccount] = useState(
  //   localStorage.getItem("currentAccount") || undefined
  // );
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [newTransaction, setNewTransaction] = useState();
  const [newMsg, setNewMsg] = useState();
  const currentAccount = localStorage.getItem("currentAccount");

  // const connectWallet = async () => {
  //   try {
  //     if (!ethereum) return alert("Please install MetaMask.");

  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     localStorage.setItem("currentAccount", accounts[0]);
  //     setCurrentAccount(localStorage.getItem("currentAccount"));
  //   } catch (error) {
  //     logger(error);

  //     throw new Error("No ethereum object");
  //   }
  // };

  const createSpotInContract = async (inputs) => {
    try {
      setTransactionLoading(true);
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const newSpot = await transactionsContract.createSellOrder(
          inputs.wlPrice,
          inputs.mintPrice
          // inputs.mintPrice,
          // inputs.wlPrice
        );
        setTransactionLoading(true);
        await newSpot.wait();
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

  const approveSpend = async (input) => {
    try {
      //setTransactionLoading(true)
      if (ethereum) {
        const approvalContract = createApproveContract();
        const approvePayment = await approvalContract.approve(
          masterContract,
          input
        );
        await approvePayment.wait();
        console.log(approvePayment);
        //console.log(currentAccount.balance);
        //setTransactionLoading(false);
        return approvePayment;
      }
    } catch (err) {
      logger(err);
      //setTransactionLoading(false);
      return err;
    }
  };

  const initiateBuy = async (id) => {
    try {
      setTransactionLoading(true);
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: masterContract,
              gas: "0x5208", //hexadecimal for eth network
              //value: parsedAmount._hex,
            },
          ],
        });
        const buySpot = await transactionsContract.initiateBuy(id);
        // await buySpot.wait();
        console.log(buySpot);
        console.log(currentAccount);
        return buySpot;
      }
      setTransactionLoading(false);
    } catch (err) {
      logger(err);
      setTransactionLoading(false);
      return err;
    }
  };

  const approvePay = async (spotId) => {
    try {
      setTransactionLoading(true);
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const approvePayment = await transactionsContract.approvePayment(
          spotId
        );
        await approvePayment.wait();
        logger(approvePayment);
        setTransactionLoading(false);
        return approvePayment;
      }
    } catch (err) {
      logger(err);
      setTransactionLoading(false);
      return err;
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        //connectWallet,
        createEthereumContract,
        //currentAccount,
        transactionLoading,
        createSpotInContract,
        approveSpend,
        initiateBuy,
        approvePay,
        newTransaction: [newTransaction, setNewTransaction],
        newMsg: [newMsg, setNewMsg],
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
