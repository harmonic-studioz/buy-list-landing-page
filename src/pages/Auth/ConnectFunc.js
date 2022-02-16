import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
//import { ethers } from "ethers";
const { ethereum } = window

const metamaskConnect = async () => {
  // Using metamask
  try {
    if (!ethereum) return alert('Please install MetaMask.')
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
  } catch (error) {
    console.log(error)
  }
}
const connectWallet = async () => {
  // Using Wallet Connect
  try {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'INFURA_ID', // required
        },
      },
    }
    const web3Modal = new Web3Modal({
      //network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    })
    const provider = await web3Modal.connectTo('walletconnect')
    const web = new Web3(provider)
  } catch (err) {
    console.log(err)
  }
}
