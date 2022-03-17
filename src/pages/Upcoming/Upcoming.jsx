import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Container from "../../components/Container/Container";
//import Hero from "./components/Hero3";
import Spots from "../Home/components/Spots";
import Footer from "../../components/Footer/Footer";
import { CircularProgress } from "@material-ui/core";

import { publicRequest } from "../../utils/requestMethods";
import { logger } from "../../utils/logger";

const Upcoming = () => {
  const [activeCollections, setActiveCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getCollections = async () => {
      try {
        const spotsReq = await publicRequest.get("projects/get-projects");
        logger("REQ RESPONSE: ", spotsReq.data.result);
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
      <div className="pdt-major"></div>
      <Container>
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
              screen="all"
            />
          )
        )}

        <Footer />
      </Container>
    </>
  );
};

export default Upcoming;
