import { useState, useRef, useEffect } from 'react'
import style from '../Summer.module.scss'
import Back from '../images/back.svg'
import Check from '../images/check.svg'
import { CircularProgress } from '@material-ui/core'
import emailjs from 'emailjs-com'


export const Modals = (props) => {
    const [isLoading, setIsLoading] = useState()
    const [completed, setCompleted] = useState(false)
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        phone: '',
    })
    const [errMsg, setErrMsg] = useState('')
    //let { modalB } = useRef()


    const inputHandler = async (event) => {
        setUserInput({
            ...userInput,
            [event.target.name]: event.target.value,
        })
    }
    emailjs.init('c7d9OOSN_QfJ7Flb0')
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        // submit stuff
        if (userInput.name && userInput.email && userInput.phone) {
            const formFields = {
                userName: userInput.name,
                userEmail: userInput.email,
                userPhone: userInput.phone,
            }

            //setCompleted(true)

            emailjs.send('service_buylist01', 'template_buylist01', formFields).then(
                function (response) {
                    setCompleted(true)
                    console.log('SUCCESS!', response.status, response.text)

                },
                function (error) {
                    console.log('FAILED...', error)
                    setErrMsg('Sorry an error occured')
                },
            )

        }
        else {
            //SetResMessage('All input fields are required')
        }
        setIsLoading(false)
    }

    return (
        <>

            <div className={style.modalContainer}>

                <div className={style.modal}
                    // ref={(el) => {
                    //     modalB = el
                    // }}
                    id="formBoxS"
                > {!completed && (
                    <form onSubmit={handleSubmit} >
                        <div className={style.modalTop}>
                            <img src={Back} alt="back"
                                //onClick={handleModal} 
                                // ref={(el) => {
                                //     back = el
                                // }}
                                id='backS'
                            />
                            <h2>Register for classes</h2>
                        </div>
                        <div className={style.modalBody} >
                            <div className={style.inputBx}>
                                <p>Name</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={userInput.name}
                                    onChange={inputHandler}
                                    required
                                />
                            </div>
                            <div className={style.inputBx}>
                                <p>Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={userInput.email}
                                    onChange={inputHandler}
                                    required
                                />
                            </div>
                            <div className={style.inputBx}>
                                <p>Phone number</p>
                                <input
                                    type="number"
                                    name="phone"
                                    value={userInput.number}
                                    onChange={inputHandler}
                                />
                            </div>
                        </div>
                        <div className={style.modalBtn}>
                            <button type='submit' disabled={isLoading} id="submitBtn">
                                {isLoading ? (
                                    <CircularProgress color="inherit" size="25px" />
                                ) : (
                                    'Register now'
                                )}
                            </button>
                            {errMsg && (<p className='redTxt'>{errMsg}</p>)}
                        </div>
                    </form>)}
                    {completed && (
                        <div>
                            <div className={style.modalBody2}>
                                <div className={style.complete}>
                                    <img
                                        className='animate__animated animate__jackInTheBox animation__duration-3s '
                                        src={Check} alt="complete" />
                                </div>
                                <div className={style.checkTxt}>
                                    <h2>Registration successful!</h2>
                                    <p>Congratulations, you have succesfully reserved a seat for this class, we will reach out to you with further details.</p>
                                </div>
                            </div>
                        </div>)}
                </div>
                {/* {completed && (
                    <div className={style.completeModal} id="formBoxS">
                        <div className={style.modalBody}>
                            <div className={style.complete}>
                                <img
                                    className='animate__animated animate__jackInTheBox animation__duration-3s '
                                    src={Check} alt="complete" />
                            </div>
                            <div className={style.checkTxt}>
                                <h2>Registration successful!</h2>
                                <p>Congratulations, you have succesfully reserved a seat for this class, we will reach out to you with further details.</p>
                            </div>
                        </div>
                    </div>)} */}
            </div>
        </>
    )
}
