import './Auth.scss'
import Logo from '../../assets/logo.png'
import Saly from '../../assets/images/saly02.svg'

const Login = () => {
  return (
    <div>
      <img src={Logo} alt="logo" />
      <img style={{ width: '160px' }} src={Saly} alt="saly" />
    </div>
  )
}

export default Login
