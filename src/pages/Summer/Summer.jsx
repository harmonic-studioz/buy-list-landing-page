import { useState, useEffect, useRef } from 'react'
import NavBar from '../../components/NavBarS/NavBar'
import { motion } from 'framer-motion'
import { gsap, Power3 } from 'gsap'

import Container from '../../components/Container/Container'
import { Modals } from './Modals/Modals'
import Hero from './images/hero.svg'
import Shape from './images/shape.svg'
import style from './Summer.module.scss'

export const Summer = () => {
    const [showModal, setShowModal] = useState(false)
    let { signUpBtn } = useRef()
    useEffect(() => {
        const t1 = gsap.timeline({ paused: true })
        signUpBtn.onclick = function () {
            t1.reversed(!t1.reversed())
            document.getElementById('overlayS').classList.add(style.overlay)
            //setShowModal(!showModal)
        }
        if (document.getElementById('backS')) {
            document.getElementById('backS').onclick = function () {
                t1.reversed(!t1.reversed())
                document.getElementById('overlayS').classList.toggle(style.overlay)
                setShowModal(!showModal)
            }
        }

        document.getElementById('overlayS').onclick = function () {
            t1.reversed(!t1.reversed())
            document.getElementById('overlayS').classList.toggle(style.overlay)
            setShowModal(!showModal)
        }


        t1.to('#formBoxS', 0, {
            duration: -.1,
            y: 0,
            ease: Power3.easeInOut,
        })

        t1.reverse()

    }, [showModal])

    return (
        <>
            {/* {showModal && */}
            <div className={`animate__animated animate__fadeIn`} id="overlayS" ></div>
            <Modals
                //handleModal={handleModal}
                showModal={showModal}
            />
            {/* } */}
            <NavBar className="navContentLanding" />
            <Container>
                <div className={style.container}>
                    <div className={style.content}>
                        <div className={style.left}>
                            <div className={style.textBx}>
                                <h1>Learn about Defi & web3 for free!</h1>
                                <p>The 1st cohort of web3 classes offered by buylist is 100% free and spans a week. You will learn about defi, web3 and NFTs.</p>
                            </div>
                            <div className={style.btns}>
                                <div className={style.btn1}>
                                    <button
                                        //onClick={() => setShowModal(true)}
                                        ref={(el) => {
                                            signUpBtn = el
                                        }}
                                    >
                                        Sign up for free</button>
                                </div>
                                <div className={style.btn2}>
                                    <button>Learn more</button>
                                </div>
                            </div>
                        </div>
                        <div className={style.right}>
                            <div className={style.imgBx}>
                                <img src={Hero} alt="summer_classes" />
                            </div>
                        </div>
                    </div>
                    <div className={style.shape}>
                        <motion.img
                            src={Shape} alt="shape"
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
                                    rotate: [60, 0, 60],
                                    y: [50, 0, 50],
                                    transition: {
                                        type: 'spring',
                                        y: {
                                            repeat: Infinity,
                                            duration: 9.4,
                                            ease: 'linear',
                                        },
                                        rotate: {
                                            repeat: Infinity,
                                            duration: 9.4,
                                            ease: 'linear',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </Container>
        </>
    )
}
