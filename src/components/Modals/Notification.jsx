import { useState, useEffect } from 'react'
import './Modals.scss'

const Notification = (props) => {
  const [classNme, setClassNme] = useState(
    'animate__animated animate__slideInDown notificationBox',
  )
  useEffect(() => {
    const handleVisibility = () => {
      if (props.status) {
        setTimeout(() => {
          setClassNme('animate__animated animate__slideOutUp notificationBox')
        }, 3000)
      }
    }

    handleVisibility()
  }, [props.status])

  return (
    <div className={classNme}>
      <div className="notificationContent">
        <p>{props.message}</p>
      </div>
    </div>
  )
}

export default Notification
