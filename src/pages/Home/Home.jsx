import { useEffect, useState } from "react";
import "./Home.scss";
import NavBar from "../../components/NavBar/NavBar";
import Container from "../../components/Container/Container";
import Hero from "./components/Hero3";
import Spots from "./components/Spots";
import Footer from "../../components/Footer/Footer";
import { CircularProgress } from "@material-ui/core";

import { publicRequest } from "../../utils/requestMethods";
import { logger } from "../../utils/logger";
import { io } from "socket.io-client";

const Home = () => {
  const [activeSpots, setActiveSpots] = useState([]);
  const [activeCollections, setActiveCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const TOKEN = user?.tokens?.token;

  useEffect(() => {
    const headers = {
      "buylist-token": TOKEN,
    };

    const connectionOptions = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket", "polling", "flashsocket"],
    };
    const socket = io(
      `${BASE_URL}/?token=${TOKEN}`,
      connectionOptions,
      headers
    );
    console.log(socket);
  }, []);

  // const socket = (token = TOKEN, query = `token=${TOKEN}`) =>
  //   io(BASE_URL, {
  //     ...connectionOptions,
  //     ...(token && { "buylist-token": { token } }),
  //     ...(query && { query }),
  //   });

  useEffect(() => {
    window.scrollTo(0, 0);

    const getActiveSpots = async () => {
      try {
        const spotsReq = await publicRequest.get("spot/get-spots?limit=5");
        logger("REQ RESPONSE: ", spotsReq.data.result);
        setActiveSpots(spotsReq.data.result);
        setIsLoading(false);
      } catch (err) {
        logger(" ERROR::: ", err);
        setIsLoading(false);
      }
    };
    getActiveSpots();
    const getCollections = async () => {
      try {
        const spotsReq = await publicRequest.get(
          "projects/get-projects?limit=5"
        );
        //logger("REQ RESPONSE: ", spotsReq.data.result);
        setActiveCollections(spotsReq.data.result);
        setIsLoading(false);
      } catch (err) {
        logger(" ERROR::: ", err);
      }
    };
    getCollections();
  }, []);

  return (
    <>
      <NavBar className="navContent" />
      <Hero />
      <Container>
        {isLoading ? (
          <div className="spotsLoading">
            <CircularProgress color="inherit" size="65px" />
          </div>
        ) : (
          activeSpots && (
            <Spots
              activeSpots={activeSpots}
              title="Whitelist Pool"
              type="regular"
              screen="less"
            />
          )
        )}
        {isLoading ? (
          <div className="spotsLoading">
            <CircularProgress color="inherit" size="65px" />
          </div>
        ) : (
          activeCollections.length >= 1 && (
            <Spots
              activeSpots={activeCollections}
              title="Upcoming NFT Collections"
              type="monitor"
              screen="less"
            />
          )
        )}

        <Footer />
      </Container>
    </>
  );
};

export default Home;
