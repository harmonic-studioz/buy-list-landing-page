import { motion } from 'framer-motion'
import Star from '../../../assets/shapes/star2.svg'
import Rocket from '../../../assets/images/rocket.svg'
const MiniHero = () => {
  return (
    <div className="mHeroContainer">
      <div data-aos="zoom-in" className="mHeroContent">
        <motion.img
          className="mStar"
          src={Star}
          alt="star"
          drag
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.4,
              opacity: 0,
            },
            visible: {
              scale: [0.7, 1, 0.7],
              opacity: 1,
              transition: {
                type: 'spring',
                scale: {
                  repeat: Infinity,
                  duration: 2.4,
                  //ease: 'linear',
                },
              },
            },
          }}
        />
        <div className="mHeroTxt">
          <h2>
            NFT whitelists for everyone,
            <br /> <span>Wagmi!</span>
          </h2>
          <a href="https://forms.gle/RqkCWaFqhqwNXYLS7">
            <button>Buy spot</button>
          </a>
        </div>
        <motion.img
          className="mRocket"
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
              rotate: [30, 0, 30],
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
      </div>
    </div>
  )
}

export default MiniHero
