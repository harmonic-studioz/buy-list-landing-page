//import { useContext } from 'react'
import Spot from '../../../components/Spot/Spot'

import Busd from '../../../assets/icons/busd.svg'

//import { TransactionContext } from '../../../context/TransactionContext'
import { shortenAddress } from '../../../utils/shortenAddress'

const Pay = (props) => {
  //const { currentAccount } = useContext(TransactionContext)
  const currentAccount = localStorage.getItem('currentAccount')
  return (
    <div className="bs-payContent">
      <div className="bsp-top">
        <Spot
          singleSpot={props.singleSpot}
          type="regular"
          spotWidth="spot_Width"
        />
        <p>
          The transaction amount will be held until you confirm whielist spot
        </p>
      </div>
      <div className="bsp-body">
        <div className="connectAdd">
          <p>{shortenAddress(currentAccount)}</p>
        </div>
        <div className="bsp-amount">
          <img src={Busd} alt="usdc" />
          <h3>{Number(props.singleSpot.whiteListPrice) + 20} USDC</h3>
        </div>
        <span>
          A one time fee of 20 USDC has been added to your charge, subsequent
          payments will be free
        </span>
      </div>
      {/* <div className="bsp-body2">

      </div> */}
    </div>
  )
}

export default Pay
