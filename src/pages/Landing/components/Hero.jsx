import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImg from '../../../assets/images/salyr.png' // salyc.png pr salyr.png
import shape1 from '../../../assets/shapes/topology.svg'
import shape2 from '../../../assets/shapes/herost.svg'

const Hero = () => {
  return (
    <section className="heroContainer">
      <div className="heroContent">
        <div className="heroIntro">
          <div className="heroTextBox">
            <h1>
              Buy and Sell
              <span> NFT </span>
              whitelist spots easily in a fair market.
            </h1>
            <p>
              Grind for a whitelist spot and easily sell on BuyList; buy in
              simple steps without grinding; curate upcoming mints and set
              reminders.
            </p>
          </div>
          <div className="heroBtns">
            <a href="https://forms.gle/RqkCWaFqhqwNXYLS7">
              <button className="btnOutline">Buy Spot</button>
            </a>
            <a href="https://forms.gle/muup2JkGjFBepNJL9">
              <button className="btnFill">Sell Spot</button>
            </a>
          </div>
          <div className="shapeBox1">
            <motion.img
              src={shape1}
              alt="circles"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  scale: 0.4,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  rotate: 360,
                  transition: {
                    type: 'spring',
                    rotate: {
                      repeat: Infinity,
                      duration: 10.4,
                      ease: 'linear',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="heroImgBox">
          <div className="salyBox">
            <motion.img
              src={heroImg}
              alt="buyList"
              //drag
              whileHover={{
                scale: 1.1,
              }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  scale: 0.4,
                  opacity: 0,
                  //x: 200,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  y: [50, 0, 50],
                  transition: {
                    //delay: 1.8,
                    //duration: 1.2,
                    type: 'spring',
                    y: {
                      repeat: Infinity,
                      duration: 2.4,
                      ease: 'linear',
                    },
                  },
                },
              }}
            />
          </div>
          <motion.img
            className="shape2"
            src={shape2}
            alt="star"
            drag
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.4,
                opacity: 0,
                //x: 200,
              },
              visible: {
                scale: [0.7, 1, 0.7],
                opacity: 1,
                transition: {
                  type: 'spring',
                  scale: {
                    repeat: Infinity,
                    duration: 4.4,
                    //ease: 'linear',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
