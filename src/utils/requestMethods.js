import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const user = JSON.parse(localStorage.getItem('user'))
//const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = user?.tokens?.token

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
})
