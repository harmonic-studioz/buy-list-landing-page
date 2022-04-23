import { useState, useEffect } from "react";
import "./UserLists.scss";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { CircularProgress } from "@material-ui/core";
import { userRequest } from "../../utils/requestMethods";
import { logger } from "../../utils/logger";
import Spot from "../../components/Spot/Spot";

import Arrow from "../../assets/icons/arrow1.svg";

const UserLists = () => {
  const [tab, setTab] = useState("userSpots");
  const [spots, setSpots] = useState({
    currentSpots: [],
    userSpots: [],
    monitoredSpots: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const getUserSpots = async () => {
      try {
        const spotsReq = await userRequest.get("spot/owned");
        //logger(spotsReq);
        //logger('REQ RESPONSE: ', spotsReq.data.result)
        setSpots({
          currentSpots: spotsReq.data,
          userSpots: spotsReq.data,
          monitoredSpots: [],
        });
        setIsLoading(false);
      } catch (err) {
        logger(" ERROR::: ", err);
        setIsLoading(false);
      }
    };
    getUserSpots();
  }, []);

  const handleUserSpots = () => {
    setTab("userSpots");
    setSpots({
      ...spots,
      currentSpots: spots.userSpots,
    });
  };
  const handleMSpots = async () => {
    setTab("mSpots");
    setIsLoading(true);
    if (spots.monitoredSpots.length < 1) {
      try {
        const spotsReq = await userRequest.get("projects/get-subscriptions");
        logger(spotsReq);
        //logger('REQ RESPONSE: ', spotsReq.data.result)
        setSpots({
          ...spots,
          currentSpots: spotsReq.data,
          monitoredSpots: spotsReq.data,
        });
        setIsLoading(false);
      } catch (err) {
        logger(" ERROR::: ", err);
        setIsLoading(false);
      }
    } else {
      setSpots({
        ...spots,
        currentSpots: spots.monitoredSpots,
      });
    }
    setIsLoading(false);
  };
  return (
    <>
      <NavBar className="navContent" />
      <div className="bsContainer">
        <div className="bsContent">
          <div className="bsBox">
            <div className="bsBox-Top">
              <div className="bsb-title">
                <Link to="/home">
                  <img src={Arrow} alt="back" />
                </Link>
                <h1>Your lists</h1>
              </div>
            </div>
            <div className="ylContent">
              <div className="ylTabs">
                <div
                  className={`${tab === "userSpots" ? "ylTabActive" : "ylTab"}`}
                  onClick={handleUserSpots}
                >
                  <p>Whitelist Ads</p>
                </div>
                <div
                  className={`${tab === "mSpots" ? "ylTabActive" : "ylTab"}`}
                  onClick={handleMSpots}
                >
                  <p>Upcoming drops</p>
                </div>
              </div>
              <div className="ylItems">
                {isLoading ? (
                  <div className="spotsLoading">
                    <CircularProgress color="inherit" size="65px" />
                  </div>
                ) : (
                  spots.currentSpots &&
                  spots.currentSpots.map((spot) => (
                    <Spot
                      key={spot.id}
                      type="regular"
                      spotWidth="spot_Width"
                      singleSpot={spot}
                    />
                  ))
                )}
                {spots.currentSpots.length < 1 && !isLoading && (
                  <div className="spotsLoading">
                    <p>Nothing to see here yet...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLists;
