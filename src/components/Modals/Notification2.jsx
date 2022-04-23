import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./Modals.scss";

const portalElement = document.getElementById("overlayMain");

const Notification2 = (props) => {
  const [classNme, setClassNme] = useState(
    "animate__animated animate__slideInDown notificationBox"
  );
  useEffect(() => {
    const handleVisibility = () => {
      if (props.status === false) {
        setTimeout(() => {
          setClassNme("animate__animated animate__slideOutUp notificationBox");
        }, 3000);
      }
    };
    handleVisibility();
  }, [props.status]);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={classNme} onClick={props.closeNotification}>
          <div className="notificationContent">
            <p>{props.message}</p>
            <span>Click to view</span>
          </div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default Notification2;
