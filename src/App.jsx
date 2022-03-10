import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import "./App.css";
import "./Hover.css";
import "aos/dist/aos.css";
import "animate.css";
import AOS from "aos";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import ListSpot from "./pages/ListSpot/ListSpot";
import BuySpot from "./pages/BuySpot/BuySpot";
import SellSpot from "./pages/SellSpot/SellSpot";
import PostProject from "./pages/PostProject/PostProject";
import SaleComplete from "./pages/SaleComplete.jsx";
import Verification from "./pages/Auth/Verification";

import { AuthContext } from "./context/AuthContext";
import UniContext from "./context/UniContext";
import useWalletConnect from "./hooks/walletConnect";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const [authState] = useContext(AuthContext);
  const data = useWalletConnect();
  return (
    <UniContext.Provider value={data}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/auth/verify" element={<Verification />}></Route>
          <Route
            path="/home"
            element={authState.user ? <Home /> : <Auth />}></Route>
          <Route path="/listSpot" element={<ListSpot />}></Route>
          <Route path="/buySpot/:spotId" element={<BuySpot />}></Route>
          <Route path="/sellSpot" element={<SellSpot />}></Route>
          <Route path="/postProject" element={<PostProject />}></Route>
          <Route path="/saleComplete" element={<SaleComplete />}></Route>
        </Routes>
      </Router>
    </UniContext.Provider>
  );
};

export default App;
