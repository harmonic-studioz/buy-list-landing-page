import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import TextInput from "../../components/Inputs/TextInput";
import Select from "../../components/Inputs/Select01";

import Saly from "../../assets/images/saly02.svg";
import Arrow from "../../assets/icons/arrow1.svg";
import { CircularProgress } from "@material-ui/core";

//import { TransactionContext } from '../../context/TransactionContext'
import { userRequest } from "../../utils/requestMethods";
import { logger } from "../../utils/logger";

const PostProject = () => {
  const [inputs, setInputs] = useState({
    projectName: "",
    discordLink: "",
    twitterLink: "",
    mintPrice: "",
    mintToken: "",
    mintDate: "",
  });
  const [response, setResponse] = useState({
    error: "",
    success: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const inputHandler = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setResponse({
      ...response,
      error: "",
    });

    try {
      const listDetails = {
        projectName: inputs.projectName,
        discordChannelLink: inputs.discordLink,
        twitterPageLink: inputs.twitterLink,
        mintPrice: inputs.mintPrice,
        mintToken: inputs.mintToken,
        mintDate: inputs.mintDate,
      };
      // const createProjectReq = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}projects/create-project`,
      //   listDetails,
      //   body,
      // )
      const createProjectReq = await userRequest.post(
        "projects/create-project",
        listDetails
      );
      logger("REQ RESPONSE: ", createProjectReq);
      setIsLoading(false);
      setInputs({
        projectName: "",
        discordLink: "",
        twitterLink: "",
        mintPrice: "",
        mintToken: "",
        mintDate: "",
      });
    } catch (err) {
      logger(" ERROR::: ", err);
      setResponse({
        error: err?.response.data.error,
        success: "",
      });
    }
  };

  return (
    <div className="postProContent">
      <NavBar className="navContent" />
      <div className="lsContainer">
        <div className="lsContent">
          <div className="lsLeft">
            <div className="lsImg">
              <motion.img
                src={Saly}
                alt="illustration"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    //scale: 0.4,
                    y: 100,
                    opacity: 0,
                    rotate: -30,
                  },
                  visible: {
                    //scale: 1,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    transition: {
                      duration: 0.5,
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="lsRight">
            <form className="lsBox" onSubmit={handleSubmit}>
              <div className="lsBox-Top mg-btm3">
                <div className="lsb-title">
                  <Link to="/home">
                    <img src={Arrow} alt="back" />
                  </Link>
                  <h1>Post NFT project</h1>
                </div>
              </div>
              <TextInput
                label="Project name"
                type="text"
                PH="name"
                inputName="projectName"
                value={inputs.projectName}
                inputHandler={inputHandler}
              />
              <TextInput
                label="Discord channel link"
                type="text"
                PH="link"
                inputName="discordLink"
                value={inputs.discordLink}
                inputHandler={inputHandler}
              />
              <TextInput
                label="Twitter page link"
                type="text"
                PH="link"
                inputName="twitterLink"
                value={inputs.twitterLink}
                inputHandler={inputHandler}
              />
              <TextInput
                label="Mint Price"
                type="text"
                PH="price"
                inputName="mintPrice"
                value={inputs.mintPrice}
                inputHandler={inputHandler}
              />

              <Select
                label="Mint token"
                inputName="mintToken"
                inputHandler={inputHandler}
              />
              <TextInput
                label="Mint date"
                type="date"
                PH=""
                inputName="mintDate"
                value={inputs.mintDate}
                inputHandler={inputHandler}
              />
              <div className="ls-btns">
                <button className="opaque">Back</button>
                <button
                  //onClick={handleSubmit}
                  disabled={isLoading}
                  type="submit"
                  className="ls-btn-s"
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size="25px" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProject;
