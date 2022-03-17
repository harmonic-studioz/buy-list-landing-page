import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Auth.scss";
import Logo from "../../assets/logo.png";
import Saly from "../../assets/images/saly02.svg";
import { CircularProgress } from "@material-ui/core";
import Arrow from "../../assets/icons/arrow1.svg";
import Check from "../../assets/icons/checkmark.svg";
import { publicRequest } from "../../utils/requestMethods";

const Verification = () => {
  const [res, setRes] = useState("");
  const [linkReq, setLinkReq] = useState({
    isLoading: false,
    onHold: false,
    response: "",
  });
  useEffect(() => {
    if (linkReq.onHold) {
      setTimeout(() => {
        setLinkReq({
          ...linkReq,
          unHold: false,
        });
      }, 5 * 60 * 1000);
      //}, 100);
    }
  }, [linkReq]);

  const handleSubmit = async () => {
    setLinkReq({
      ...linkReq,
      isLoading: true,
      onHold: true,
    });
    const userMail = localStorage.getItem("usermail");
    try {
      const verifyReq = await publicRequest.get(
        `auth/re-generate-verification-code?email=${userMail}`
      );
      console.log(verifyReq);
      setRes("Link was resent!");
      setLinkReq({
        ...linkReq,
        isLoading: false,
        onHold: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="authContainer">
      <div className="authContent">
        <div className="authLeft">
          <div className="authLogo">
            {" "}
            <img src={Logo} alt="logo" />
          </div>

          <div className="authImg">
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
        <div className="authRight">
          <div className="authBox">
            <div className="connectContent">
              <div className="connectTop">
                <Link to="/auth">
                  <img src={Arrow} alt="back" />
                </Link>
                <div className="coTop_txt ">
                  <h5>Verify email</h5>
                </div>
              </div>
              <div className="connectCompleteBx animate__animated animate__zoomIn">
                <img src={Check} alt="" />

                <p className="connectedtxt">
                  Sign up complete! <br />
                  <br />
                  Please check your email for verification link or request a new
                  one below.
                </p>
              </div>

              <div className="loginBx">
                <button
                  disabled={linkReq.isLoading || linkReq.onHold}
                  onClick={handleSubmit}
                  type="submit"
                >
                  {linkReq.isLoading ? (
                    <CircularProgress color="inherit" size="25px" />
                  ) : (
                    "Resend Link"
                  )}
                </button>
              </div>
              <p className="successMsg">{res}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
