import List from '../../../assets/icons/list1.svg'
import Buy from '../../../assets/icons/buy1.svg'
import Monitor from '../../../assets/icons/monitor1.svg'
import Lcard from '../../../assets/images/listCard1.svg'
import Bcard from '../../../assets/images/buyCard1.svg'

const Steps = () => {
  return (
    <div className="stepsContainer">
      <div className="stepsContent">
        <h2>How it works</h2>
        <div className="stepBox">
          <div className="stepImg">
            <img src={List} alt="list" />
          </div>
          <div className="stepTxt">
            <h3>List your whitelist spot</h3>
            <p>
              Upload whitelist spot to the marketplace by adding details about
              the spot.
            </p>
          </div>
          <div className="stepCard">
            <img src={Lcard} alt="list whitelist?" />
          </div>
        </div>
        <div className="stepCardM">
          <img src={Lcard} alt="list whitelist?" />
        </div>
        <div className="stepBox">
          <div className="stepImg">
            <img src={Buy} alt="list" />
          </div>
          <div className="stepTxt">
            <h3>Buy a whitelist spot</h3>
            <p>
              Find a project you like and buy a whitelist spot in this project.
            </p>
          </div>
          <div className="stepCard">
            <img src={Bcard} alt="list whitelist?" />
          </div>
        </div>
        <div className="stepCardM">
          <img src={Bcard} alt="list whitelist?" />
        </div>
        <div className="stepBox">
          <div className="stepImg">
            <img src={Monitor} alt="list" />
          </div>
          <div className="stepTxt">
            <h3>Monitor upcoming mints</h3>
            <p>
              Curate a list of projects you like and keep tabs on their drops.
            </p>
          </div>
          <div className="stepCard">
            <img src={Bcard} alt="list whitelist?" />
          </div>
        </div>
        <div className="stepCardM">
          <img src={Bcard} alt="list whitelist?" />
        </div>
      </div>
    </div>
  )
}

export default Steps
