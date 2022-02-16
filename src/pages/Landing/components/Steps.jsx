import List from '../../../assets/icons/list1.svg'
import Buy from '../../../assets/icons/buy1.svg'
import Monitor from '../../../assets/icons/monitor1.svg'
import Lcard from '../../../assets/images/listCard1.svg'
import Bcard from '../../../assets/images/buyCard1.svg'
import Mcard from '../../../assets/images/monitor2.svg'

const Steps = () => {
  return (
    <div className="stepsContainer">
      <div className="stepsContent" id="works">
        <h2>How it works</h2>
        <div className="stepBox" data-aos="fade-up">
          <div className="stepImg">
            <img src={List} alt="list" />
          </div>
          <div className="stepTxt">
            <h3>List your whitelist spot</h3>
            <ul>
              <li>Connect wallet </li>
              <li>Update profile. </li>
              <li>
                List whitelist spot on the marketplace by uploading relevant
                details.{' '}
              </li>
            </ul>
          </div>
          <div className="stepCard" data-aos-delay="300">
            <img src={Lcard} alt="list whitelist?" />
          </div>
        </div>
        <div className="stepCardM">
          <img src={Lcard} alt="list whitelist?" />
        </div>
        <div className="stepBox" data-aos="fade-up">
          <div className="stepImg">
            <img src={Buy} alt="list" />
          </div>
          <div className="stepTxt">
            <h3>Buy a whitelist spot</h3>
            {/* <p>
              Find a project you like and buy a whitelist spot in this project.
            </p> */}
            <ul>
              <li>Connect wallet.</li>
              <li>Update profile.</li>
              <li>Engage with whitelist-spot sell ads of interest.</li>
            </ul>
          </div>
          <div className="stepCard" data-aos-delay="300">
            <img src={Bcard} alt="list whitelist?" />
          </div>
        </div>
        <div className="stepCardM">
          <img src={Bcard} alt="list whitelist?" />
        </div>
        <div className="stepBox" data-aos="fade-up">
          <div className="stepImg">
            <img src={Monitor} alt="list" />
          </div>
          <div className="stepTxt">
            <h3>Monitor upcoming mints</h3>
            <p>
              Keep tabs on your favorite NFT projects by putting on push
              notification.
            </p>
          </div>
          <div className="stepCard" data-aos-delay="300">
            <img src={Mcard} alt="list whitelist?" />
          </div>
        </div>
        <div className="stepCardM">
          <img src={Mcard} alt="list whitelist?" />
        </div>
      </div>
    </div>
  )
}

export default Steps
