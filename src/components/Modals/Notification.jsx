import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./Modals.scss";

const portalElement = document.getElementById("overlayMain");

const Notification = (props) => {
  const [classNme, setClassNme] = useState(
    "animate__animated animate__slideInDown notificationBox"
  );
  useEffect(() => {
    const handleVisibility = () => {
      if (props.status) {
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
        <div className={classNme}>
          <div className="notificationContent">
            <p>{props.message}</p>
          </div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default Notification;
