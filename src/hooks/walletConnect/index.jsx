import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { usdc as usdcAbi } from "../../utils/abi";
import { usdc, usdc as usdcCon } from "../../utils/contracts";
import { master as masterContract } from "../../utils/contracts";
import { master as masterAbi } from "../../utils/abi";

const useWalletConnect = () => {
  const [web3, setWeb3] = useState(null);
  const [error, setError] = useState(null);
  const [contracts, setContracts] = useState({});
  const provider = new WalletConnectProvider({
    rpc: {
      "0xfa2": "https://rpc.testnet.fantom.network",
    },
  });

  const enableWalletConnect = async () => {
    try {
      await provider.enable();
      setWeb3(new Web3(provider)); // Subscribe to accounts change
      provider.on("accountsChanged", (accounts) => {
        console.log(accounts);
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        console.log(chainId);
      });

      // Subscribe to session disconnection
      provider.on("disconnect", (code, reason) => {
        console.log(code, reason);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWeb3(new Web3(window.ethereum));
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("Please install Meta mask");
    }
  };

  const initContracts = () => {
    //create necessary contracts in here;
    const usdcContract = new web3.eth.Contract(usdcAbi, usdcCon);
    const spotsContract = new web3.eth.Contract(masterAbi, masterContract);
    setContracts({
      usdcContract,
      spotsContract,
    });
  };
  useEffect(() => {
    if (web3) {
      initContracts();
    }
  }, [web3]);

  //testing functions on contracts
  //   const getBalance = async () => {
  //     const { usdcContract } = contracts;
  //     const balance = await usdcContract.methods
  //       .balanceOf((await web3.eth.getAccounts())[0])
  //       .call();
  //     console.log(balance);
  //   };

  //   const createSpot = async () => {
  //     const { spotsContract } = contracts;
  //     const create = await spotsContract.methods
  //       .create(
  //         2000000 /* price u are listing for */,
  //         10000000 /* price it is minting at */
  //       )
  //       .send({ from: (await web3.eth.getAccounts())[0] });
  //     console.log(create);
  //   };
  //testing contracts
  //   useEffect(() => {
  //     if (Object.keys(contracts).length) {
  //       getBalance();
  //       createSpot();
  //     }
  //   }, [contracts]);
  return {
    enableWalletConnect,
    web3,
    connectToMetaMask,
    contracts,
  };
};

export default useWalletConnect;
