import { motion } from 'framer-motion'
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
              Buy a <span> whitelist </span> spot without grinding now!
            </h1>
            <p>
              We want to make entry to NFT project Whitelists much more
              accessible to enthusiasts and NFT traders around the world by
              creating a marketplace for buying and selling whitlist spots.
            </p>
          </div>
          <div className="heroBtns">
            <button className="btnOutline">Buy spot</button>
            <button className="btnFill">Sell a spot</button>
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
                  x: 0,
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
