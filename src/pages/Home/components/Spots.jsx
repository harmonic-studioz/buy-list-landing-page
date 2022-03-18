import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../../../components/Modals/Notification";
import Avatar from "../../../assets/images/avatar.png";
import Arrow from "../../../assets/icons/spot_arrow.svg";
import Busd from "../../../assets/icons/busd.svg";
import Bell from "../../../assets/icons/bell.svg";
import Eth from "../../../assets/icons/eth.svg";
import { CircularProgress } from "@material-ui/core";
import { userRequest } from "../../../utils/requestMethods";
//import { logger } from "../../../utils/logger";
import { capitalizeFirstLetter } from "../../../utils/shortenAddress";

const Spots = (props) => {
  //const [spotsView, setSpotsView] = useState("limit");
  const [subscribed, setSubscribed] = useState("");
  const [message, setMessage] = useState("");
  const [activeSpots, setActiveSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActiveSpots(props.activeSpots);
  }, [props]);

  const handleSubscribe = async (spotId) => {
    setIsLoading(true);
    try {
      const id = {
        projectId: spotId,
      };
      const subReq = await userRequest.post("projects/subscription", id);
      //logger("REQ RESPONSE: ", subReq);
      //setActiveSpots(spotsReq.data.result);
      //console.log(subReq.data.message);
      setMessage(subReq.data.message);
      setIsLoading(false);
      setSubscribed(!subscribed);
    } catch (err) {
      console.log(" ERROR::: ", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="spotsContainer">
      {subscribed === true && (
        <Notification status={true} message={capitalizeFirstLetter(message)} />
      )}
      {subscribed === false && (
        <Notification status={true} message={capitalizeFirstLetter(message)} />
      )}

      <div className="spotsContent">
        <h2>{props.title}</h2>
        {props.type === "regular" && (
          <div className="spotsRows">
            {activeSpots &&
              activeSpots.map((aSpot) => (
                <div key={aSpot.id} className="spotSingle">
                  <Link to={`/buySpot/${aSpot.id}`} className="spotBx">
                    <div className="spotAvi">
                      <img src={Avatar} alt="avatar" />
                    </div>
                    <div className="spot_SingleContent">
                      <div className="spotTxt">
                        <p className="spotTitle">
                          {aSpot.projectName} ({aSpot?.mintToken || "Eth"})
                        </p>
                        {props.type === "regular" ? (
                          <div className="spotDesc">
                            <p>WL #{aSpot?.id}</p>
                            <div className="spotAmt">
                              <img src={Busd} alt="usdc" />
                              <p>{aSpot?.whiteListPrice} USDC</p>
                            </div>
                          </div>
                        ) : (
                          <div className="spotDesc2">
                            <div className="spotAmt">
                              <img src={Eth} alt="eth" />
                              <p> {aSpot?.whiteListPrice} USDC</p>
                            </div>
                            <div className="spotBell">
                              <img src={Bell} alt="bell" />
                            </div>
                            <p>22-03-22</p>
                          </div>
                        )}
                      </div>
                      <div className="spotArr">
                        <img src={Arrow} alt="arrow" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
        {props.type === "monitor" && (
          <div className="spotsRows">
            {props.activeSpots &&
              props.activeSpots.map((aSpot) => (
                <div key={aSpot.id} className="spotSingle">
                  {/* <Link to={`/project/${aSpot.id}`} className="spotBx"> */}
                  <div className="spotBx">
                    <div className="spotAvi">
                      <img src={Avatar} alt="avatar" />
                    </div>
                    <div className="spot_SingleContent2">
                      <div className="spotTxt">
                        <p className="spotTitle">
                          {aSpot.projectName} {aSpot?.mintToken || "(Eth)"}
                        </p>
                        {props.type === "regular" ? (
                          <div className="spotDesc">
                            <p>WL #{aSpot?.whiteListNo}</p>
                            <div className="spotAmt">
                              <img src={Busd} alt="usdc" />
                              <p>
                                {aSpot?.whiteListPrice} USDC
                                {/* {aSpot?.mintToken || "(Eth)" */}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="spotDesc2">
                            <div className="spotAmt">
                              {/* <img src={Eth} alt="eth" /> */}
                              <p> {aSpot?.mintPrice} USDC</p>
                            </div>
                            <>
                              <div
                                className="spotBell"
                                onClick={(e) => handleSubscribe(aSpot.id)}
                                //style={{ cursor: "pointer" }}
                              >
                                {isLoading ? (
                                  <CircularProgress
                                    color="inherit"
                                    size="15px"
                                  />
                                ) : (
                                  <img src={Bell} alt="bell" />
                                )}
                              </div>
                            </>
                          </div>
                        )}
                      </div>
                      <div className="spotArr">
                        <img src={Arrow} alt="arrow" />
                      </div>
                      <div className="m-date">
                        {props.type === "monitor" && (
                          <p>Dropping : {aSpot.mintDate.substr(0, 10)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {/* {spotsView === "limit" && (
          <div className="spotBtm">
            <p onClick={() => setSpotsView("all")}>SEE ALL</p>
          </div>
        )}
        {spotsView === "all" && (
          <div className="spotBtm">
            <p onClick={() => setSpotsView("limit")}>SEE LESS</p>
          </div>
        )} */}
        {props.screen === "less" &&
          props.type === "regular" &&
          props.activeSpots.length > 3 && (
            <Link to="/pool" className="spotBtm">
              <p>SEE ALL</p>
            </Link>
          )}
        {props.screen === "less" &&
          props.type !== "regular" &&
          props.activeSpots.length > 3 && (
            <Link to="/upcoming" className="spotBtm">
              <p>SEE ALL</p>
            </Link>
          )}
      </div>
    </div>
  );
};

export default Spots;
