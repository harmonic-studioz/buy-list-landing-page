import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import './App.css'
import './Hover.css'
import 'aos/dist/aos.css'
import 'animate.css'
import AOS from 'aos'
import Landing from './pages/Landing/Landing'
// import Auth from './pages/Auth/Auth'
// import Verification from './pages/Auth/Verification'
//import Home from './pages/Home/Home'
// import Pool from './pages/Pool/Pool'
// import ListOptions from './pages/ListOption/ListOption'
// import ListSellSpot from './pages/ListSellSpot/ListSpot'
// import ListBuySpot from './pages/ListBuySpot/ListBuySpot'
// import BuySpot from './pages/BuySpot/BuySpot'
// import SellSpot from './pages/SellSpot/SellSpotx'
// import PostProject from './pages/PostProject/PostProject'
// import ReleaseFunds from './pages/SaleComplete/ReleaseFunds'
// import CompleteSale from './pages/SaleComplete/CompleteSale'
// import UserLists from './pages/UserLists/UserLists'
// import Upcoming from './pages/Upcoming/Upcoming'

import { AuthContext } from './context/AuthContext'
import UniContext from './context/UniContext'
//import useWalletConnect from './hooks/walletConnect'

//import useSockets from './hooks/socket'

const App = () => {
  //const values = useSockets()
  useEffect(() => {
    AOS.init()
  }, [])
  //const [authState] = useContext(AuthContext)
  //const data = useWalletConnect()
  return (
    // <UniContext.Provider value={{ ...data, ...values }}>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        {/* <Route path="/auth" element={<Auth />}></Route>
          <Route path="/auth/verify" element={<Verification />}></Route> */}
        {/* <Route
            path="/home"
            element={authState.user ? <Home /> : <Auth />}
          ></Route> */}
        {/* <Route path="/home" element={<Home />}></Route> */}
        {/* <Route path="/pool" element={<Pool />}></Route>
          <Route path="/upcoming" element={<Upcoming />}></Route>
          <Route path="/listOptions" element={<ListOptions />}></Route>
          <Route path="/listSellSpot" element={<ListSellSpot />}></Route>
          <Route path="/listBuySpot" element={<ListBuySpot />}></Route>
          <Route path="/buySpot/:spotId" element={<BuySpot />}></Route>
          <Route path="/sellSpot" element={<SellSpot />}></Route>
          <Route path="/postProject" element={<PostProject />}></Route>
          <Route
            path="/releaseFunds/:transactionId"
            element={<ReleaseFunds />}
          ></Route>
          <Route
            path="/completeSale/:transactionId"
            element={<CompleteSale />}
          ></Route> */}
        {/* <Route path="/userLists" element={<UserLists />}></Route> */}
      </Routes>
    </Router>
    // </UniContext.Provider>
  )
}

export default App
