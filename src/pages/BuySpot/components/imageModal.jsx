import ReactDOM from 'react-dom'
//import { Link } from 'react-router-dom'
//import Close from "../../../assets/icons/close-circle.svg";

const portalElement = document.getElementById('overlayMain')

const imageModal = (props) => {
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
        <div className="animate__animated animate__zoomInUp modal2">
          <div className="modalContent">
            <img
              src={
                props.imgView === 1
                  ? props.singleSpot.discordShot
                  : props.imgView === 2
                  ? props.singleSpot.twitterShot
                  : ''
              }
              alt="screenshot"
            />
          </div>
        </div>,
        portalElement,
      )}
    </>
  )
}

export default imageModal
