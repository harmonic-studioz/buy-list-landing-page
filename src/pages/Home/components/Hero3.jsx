import { motion } from 'framer-motion'
import shape1 from '../../../assets/shapes/topology2.svg'
import shape2 from '../../../assets/shapes/star3.svg'
import Rocket from '../../../assets/images/rocket.svg'
import Arrow from '../../../assets/icons/sm-arrow.svg'

const Hero3 = () => {
  return (
    <div className="heroHomeContainer">
      <div className="hhContent">
        <div className="hhShape1">
          <motion.img
            src={shape1}
            alt="shape"
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

        <div className="hhTextBx">
          <motion.img
            className="hhRocket"
            src={Rocket}
            alt="rocket"
            initial="hidden"
            animate="visible"
            drag
            variants={{
              hidden: {
                scale: 0.4,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                rotate: [45, 0, 45],
                y: [20, 0, 20],
                transition: {
                  type: 'spring',
                  y: {
                    repeat: Infinity,
                    duration: 4.4,
                    ease: 'linear',
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 4.4,
                    ease: 'linear',
                  },
                },
              },
            }}
          />
          <p className="hhTxt">
            Welcome to the worlds first digital whitelist marketplace
          </p>
          <div className="hhBtn">
            <p>List a whitelist spot</p>
            <img src={Arrow} alt="next" />
          </div>
        </div>
        <div className="hhShape2">
          <motion.img
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
    </div>
  )
}

export default Hero3
