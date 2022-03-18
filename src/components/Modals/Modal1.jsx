import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './Modals.scss'
import Check from '../../assets/icons/checkmark.svg'
import Close from '../../assets/icons/close-circle.svg'

const portalElement = document.getElementById('overlayMain')

const Modal01 = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className="animate__animated animate__fadeIn modalOverlay"
          onClick={props.handleClose}
        ></div>,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <div className="animate__animated animate__zoomInUp modal">
          <div className="modalContent">
            <div className="modalTop">
              <img src={Close} alt="close" onClick={props.handleClose} />
            </div>
            <div className="modalBody">
              <img src={Check} alt="complete" />
              <p>{props.message}</p>
            </div>
            <Link to="/home" className="modalBtn">
              <button>Back Home</button>
            </Link>
          </div>
        </div>,
        portalElement,
      )}
    </>
  )
}

export default Modal01
