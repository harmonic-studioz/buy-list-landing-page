import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Container from "../../components/Container/Container";
//import Hero from "./components/Hero3";
import Spots from "../Home/components/Spots";
import Footer from "../../components/Footer/Footer";
import { CircularProgress } from "@material-ui/core";

import { publicRequest } from "../../utils/requestMethods";
import { logger } from "../../utils/logger";

const Pool = () => {
  const [activeSpots, setActiveSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getActiveSpots = async () => {
      try {
        const spotsReq = await publicRequest.get("spot/get-spots");
        //logger('REQ RESPONSE: ', spotsReq.data.result)
        setActiveSpots(spotsReq.data.result);
        setIsLoading(false);
      } catch (err) {
        logger(" ERROR::: ", err);
        setIsLoading(false);
      }
    };
    getActiveSpots();
  }, []);

  return (
    <>
      <NavBar className="navContent" />
      <div className="pdt-major"></div>
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
              screen="all"
            />
          )
        )}

        <Footer />
      </Container>
    </>
  );
};

export default Pool;
