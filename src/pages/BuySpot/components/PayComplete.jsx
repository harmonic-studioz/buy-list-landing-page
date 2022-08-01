import Spot from "../../../components/Spot/Spot";
import Check from "../../../assets/icons/checkmark.svg";
//import Busd from '../../../assets/icons/busd.svg'

const PayComplete = (props) => {
  return (
    <div className="bs-payContent">
      <div className="bsp-top">
        <Spot
          type="regular"
          spotWidth="spot_Width"
          singleSpot={props.singleSpot}
        />
        <p>
          The transaction amount will be held until you confirm whitelist spot
        </p>
      </div>
      <div className="bsp-body">
        <img src={Check} alt="check" />
        <span>
          Congratulations, you have initiated a transaction with user{" "}
          {props.singleSpot.user.email}
        </span>
      </div>
      {/* <div className="bsp-body2">

      </div> */}
    </div>
  );
};

export default PayComplete;
