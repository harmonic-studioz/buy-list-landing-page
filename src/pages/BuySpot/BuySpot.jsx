import { useState, useEffect, useContext } from "react";
import useStateRef from "react-usestateref";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "./BuySpot.scss";
import NavBar from "../../components/NavBar/NavBar";

import { CircularProgress } from "@material-ui/core";
import { publicRequest } from "../../utils/requestMethods";
import { logger } from "../../utils/logger";

import Arrow from "../../assets/icons/arrow1.svg";
import Buy from "./components/Buy";
import Pay from "./components/Pay";
import Transaction from "./components/Transaction";
import PayComplete from "./components/PayComplete";

import { TransactionContext } from "../../context/TransactionContext";
//import { AuthContext } from "../../context/AuthContext";

const BuySpot = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const spotId = useParams().spotId;
  const [step, setStep] = useState(1);
  const [singleSpot, setSingleSpot] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTr, setIsLoadingTr] = useState(false);
  const [ev, setEv, evRef] = useStateRef([]);

  const {
    initiateBuy,
    transactionLoading,
    //createEthereumContract,
    approveSpend,
  } = useContext(TransactionContext);
  //const [authState] = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    const getSpot = async () => {
      try {
        const spotsReq = await publicRequest.get(`spot/single?id=${spotId}`);
        logger("REQ RESPONSE: ", spotsReq.data);
        setSingleSpot(spotsReq.data);
        setIsLoading(false);
      } catch (err) {
        logger(" ERROR::: ", err);
      }
    };
    getSpot();
  }, [spotId]);

  // useEffect(() => {
  //   const onBuySpot = async () => {
  //     const transactionsContract =  await createEthereumContract()
  //     transactionsContract.on(
  //       'SpotStateChanged',
  //       (spotId, fromState, toState) => {
  //        const spotIdValue = spotId.toString()
  //         setEv({
  //           spotIdValue,
  //           fromState,
  //           toState,
  //         })
  //       },
  //     )
  //   }
  //   onBuySpot()
  // }, [createEthereumContract, setEv, transactionLoading, isLoading])

  const handleBuy = async () => {
    setIsLoadingTr(true);
    // const approve = await approveSpend(200)
    // console.log(approve)
    // setIsLoadingTr(true)
    setTimeout(() => {
      initiateBuy(spotId);
    }, 1500);
    // const approvePayment = await approveTransaction(spotId)
    // console.log(approvePayment)
    // if (approvePayment.data.code !== 3) {
    //   const buySpot = await initiateBuy(spotId)
    //   console.log(buySpot.data.message)
    // }
    setIsLoadingTr(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (step >= 1 && step < 3) {
    //   setStep(step + 1)
    // }
    if (step === 1) {
      setIsLoadingTr(true);
      const approve = approveSpend(Number(singleSpot.whiteListPrice) * 1000000);
      console.log(approve);
      setTimeout(() => {
        setStep(step + 1);
      }, 3500);
    }
    if (step === 2) {
      handleBuy();
      //setStep(step + 1)
    }
    if (step === 3) {
      // redirect
      navigate("/saleComplete");
    }
  };

  return (
    <>
      <NavBar className="navContent" />
      <div className="bsContainer">
        {isLoading ? (
          <div className="spotsLoading">
            <CircularProgress color="inherit" size="65px" />
          </div>
        ) : (
          <div className="bsContent">
            {singleSpot && (
              <form className="bsBox">
                <div className="bsBox-Top">
                  <div className="bsb-title">
                    <Link to="/home">
                      <img src={Arrow} alt="back" />
                    </Link>
                    <h1>
                      {step === 1
                        ? "Buy whitelist spot"
                        : step === 2
                        ? "Pay to Escrow"
                        : step === 3
                        ? "Pay to Escrow"
                        : step === 4
                        ? "Buy whitelist spot"
                        : "Buy whitelist spot"}
                    </h1>
                  </div>
                </div>
                {step === 1 ? (
                  <Buy singleSpot={singleSpot} />
                ) : step === 2 ? (
                  <Pay singleSpot={singleSpot} />
                ) : step === 3 ? (
                  <PayComplete singleSpot={singleSpot} />
                ) : (
                  <Transaction singleSpot={singleSpot} />
                )}

                <div className="bsBtn">
                  <button onClick={handleSubmit}>
                    {step === 1
                      ? "Buy"
                      : step === 2
                      ? "Complete payment"
                      : step === 3
                      ? "Proceed to chat"
                      : step >= 4
                      ? "Release funds"
                      : "Release funds"}
                    {isLoadingTr && (
                      <CircularProgress color="inherit" size="25px" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BuySpot;
