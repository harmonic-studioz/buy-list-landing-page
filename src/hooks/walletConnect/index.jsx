import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { usdc as usdcAbi } from '../../utils/abi'
import { usdc as usdcCon } from '../../utils/contracts'
import { master as masterContract } from '../../utils/contracts'
import { master as masterAbi } from '../../utils/abi'
import { logger } from '../../utils/logger'

const useWalletConnect = () => {
  const [web3, setWeb3] = useState(null)
  const [error, setError] = useState(null)
  const [contracts, setContracts] = useState({})
  const [currentAccount, setCurrentAccount] = useState(
    localStorage.getItem('currentAccount') || undefined,
  )
  const [chain, setChain] = useState()
  const provider = new WalletConnectProvider({
    rpc: {
      '0xfa2': 'https://rpc.testnet.fantom.network',
    },
  })

  const enableWalletConnect = async () => {
    try {
      await provider.enable()
      setWeb3(new Web3(provider)) // Subscribe to accounts change
      provider.on('accountsChanged', (accounts) => {
        console.log(accounts)
        localStorage.setItem('currentAccount', accounts[0])
        setCurrentAccount(localStorage.getItem('currentAccount'))
      })

      // Subscribe to chainId change
      provider.on('chainChanged', (chainId) => {
        console.log('chainId>>>>', chainId)
        setChain(chainId)
        localStorage.setItem('chain', chainId)
      })

      // Subscribe to session disconnection
      provider.on('disconnect', (code, reason) => {
        console.log(code, reason)
      })
    } catch (err) {
      console.log(err)
    }
  }

  //  delete window.web3;

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setWeb3(new Web3(window.ethereum))
        localStorage.setItem('currentAccount', accounts[0])
        setChain(window.ethereum.chainId)
        console.log('network1 >> ', window.ethereum.chainId)
        localStorage.setItem('chain', window.ethereum.chainId)
        setCurrentAccount(accounts[0])
      } catch (err) {
        console.log(err)
      }
    } else {
      setError('Please install Meta mask')
      logger(error)
    }
  }
  // const disonnectWallet = async () => {
  //   // await window.ethereum.request({
  //   //   method: "wallet_requestPermissions",
  //   //   params: [
  //   //     {
  //   //       eth_accounts: {},
  //   //     },
  //   //   ],
  //   // });
  //   try {
  //     provider.disconnect();
  //     // localStorage.removeItem("user");
  //     // localStorage.removeItem("currentAccount");
  //     // window.location = "/auth";
  //     console.log("exiting");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const disonnectWallet = () => {
    return new Promise(async (resolve, reject) => {
      try {
        delete window.web3
        localStorage.removeItem('user')
        localStorage.removeItem('currentAccount')
        localStorage.removeItem('chain')
        localStorage.setItem('reloadCount', 0)
        window.location = '/auth'
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const initContracts = () => {
    //create necessary contracts in here;
    const usdcContract = new web3.eth.Contract(usdcAbi, usdcCon)
    const spotsContract = new web3.eth.Contract(masterAbi, masterContract)
    setContracts({
      usdcContract,
      spotsContract,
    })
  }
  useEffect(() => {
    if (web3) {
      initContracts()
    }
    // eslint-disable-next-line
  }, [web3])

  //testing functions on contracts
  //   const getBalance = async () => {
  //     const { usdcContract } = contracts;
  //     const balance = await usdcContract.methods
  //       .balanceOf((await web3.eth.getAccounts())[0])
  //       .call();
  //     console.log(balance);
  //   };

  const createNewSpot = async (inputs) => {
    const { spotsContract } = contracts
    try {
      console.log(spotsContract.methods)
      const create = await spotsContract.methods
        .createSellOrder(
          2000000 /* price u are listing for */,
          10000000 /* price it is minting at */,
          // inputs.wlPrice,
          // inputs.mintPrice
        )
        .send({ from: currentAccount })
      console.log(create)
      return create
    } catch (err) {
      console.log(err)
      return err
    }
  }
  const initiateBuy = async (id) => {
    const { spotsContract } = contracts
    try {
      const buy = await spotsContract.methods
        .initiateBuy(id)
        .send({ from: currentAccount })
      console.log(buy)
      return buy
    } catch (err) {
      console.log(err)
      return err
    }
  }

  //testing contracts
  //   useEffect(() => {
  //     if (Object.keys(contracts).length) {
  //       getBalance();
  //       createSpot();
  //     }
  //   }, [contracts]);

  useEffect(() => {
    // setChain(window.ethereum.chainId);
    // console.log("network1 >> ", window.ethereum.chainId);
    // localStorage.setItem("chain", window.ethereum.chainId);
    const onWalletChange = async () => {
      try {
        //if (window.ethereum.chainId) {

        // }
        // log out user on account change
        window.ethereum.on('accountsChanged', (accounts) => {
          try {
            localStorage.removeItem('user')
            localStorage.removeItem('currentAccount')
            localStorage.removeItem('chain')
            window.location = '/auth'
            console.log('exiting')
          } catch (err) {
            console.log(err)
          }
        })

        // change user wallet on account change
        // window.ethereum.on("accountsChanged", (accounts) => {
        //   console.log("new Account", accounts[0]);
        //   localStorage.setItem("currentAccount", accounts[0]);
        //   setCurrentAccount(localStorage.getItem("currentAccount"));
        //   if (accounts[0] === undefined) {
        //     try {
        //       localStorage.removeItem("user");
        //       localStorage.removeItem("currentAccount");
        //       window.location = "/auth";
        //       console.log("exiting");
        //     } catch (err) {
        //       console.log(err);
        //     }
        //   }
        // });

        //Subscribe to chainId change
        window.ethereum.on('chainChanged', (chainId) => {
          console.log(chainId)
          try {
            localStorage.removeItem('user')
            localStorage.removeItem('currentAccount')
            localStorage.removeItem('chain')
            window.location = '/auth'
            console.log('exiting')
          } catch (err) {
            console.log(err)
          }
        })

        // Subscribe to session disconnection
        window.ethereum.on('disconnect', (code, reason) => {
          console.log(code, reason)
          localStorage.removeItem('user')
          localStorage.removeItem('currentAccount')
          window.location = '/auth'
          console.log('exiting')
        })
      } catch (err) {
        console.log(err)
      }
    }
    onWalletChange()
  }, [currentAccount, chain])

  return {
    enableWalletConnect,
    disonnectWallet,
    web3,
    connectToMetaMask,
    contracts,
    currentAccount,
    createNewSpot,
    initiateBuy,
  }
}

export default useWalletConnect
