import abi from './Transactions.json'
import abi_app from './Approve.json'
export const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
export const approveAddress = process.env.REACT_APP_APPROVE_ADDRESS
export const contractABI = abi.abi
export const approveABI = abi_app
