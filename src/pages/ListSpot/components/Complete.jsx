import Check from '../../../assets/icons/checkmark.svg'
import Spot from '../../../components/Spot/Spot'
import {Link} from 'react-router-dom'

const Complete = (props) => {
  return (
    <div className="lsComplete">
      <div className="lsc-content">
        <img src={Check} alt="complete" />
        <p>Congratulations, your whitelist Ad has been successfully posted</p>
        
          <span><Link to="/home">Click below to view in the market pool</Link></span>
          
      </div>
      <Spot type="regular" singleSpot={props.singleSpot} />
    </div>
  )
}

export default Complete
