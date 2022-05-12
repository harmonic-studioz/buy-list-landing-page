import axios from 'axios'
// import { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'

const BASE_URL = process.env.REACT_APP_BASE_URL

const user = JSON.parse(localStorage.getItem('user'))
//console.log('local storage user', user)

//const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = user?.tokens?.token
const hardToken = JSON.parse(localStorage.getItem('user'))?.tokens?.token
console.log('local storage token', hardToken)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    //Authorization: `Bearer ${TOKEN || hardToken}`,
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem('user'))?.tokens?.token
    }`,
    'Content-Type': 'application/json',
  },
})
