import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './NavW.scss'
import Logo from '../../assets/logo.png'
import Search from '../../assets/icons/search.svg'
import Add from '../../assets/icons/add.svg'
import { CircularProgress } from '@material-ui/core'

//import { TransactionContext } from '../../context/TransactionContext'
import { shortenAddress } from '../../utils/shortenAddress'
import { publicRequest } from '../../utils/requestMethods'
import { logger } from '../../utils/logger'

const NavWeb = (props) => {
  const Page = 'Landing'
  const [searchTerm, setSearchTerm] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //const { currentAccount } = useContext(TransactionContext)
  const currentAccount = localStorage.getItem('currentAccount')

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.length >= 3) {
        setIsLoading(true)
        try {
          const searchReq = await publicRequest.get(
            `spot/search?projectName=${searchTerm}`,
          )
          logger('REQ RESPONSE: ', searchReq.data)
          setSearchRes(searchReq.data)
          setIsLoading(false)
        } catch (err) {
          logger(' ERROR::: ', err)
        }
      } else {
        return
      }
    }
    handleSearch()
  }, [searchTerm])

  return (
    <div className="navContainer">
      <nav className={props.className}>
        {Page === 'Landing' && (
          <Link to="/home" className="logoBox">
            <img src={Logo} alt="logo" />
          </Link>
        )}
        {Page !== 'Landing' && (
          <Link className="logoBox" to="/home">
            <img src={Logo} alt="logo" />
          </Link>
        )}
        <ul className="navMid">
          <a href="/#works">
            <li className="hvr-underline-from-left">How it works </li>
          </a>
          <a href="/#faq">
            {' '}
            <li className="hvr-underline-from-left">FAQs</li>
          </a>
          <a href="mailto:support@buylistnft.com">
            <li className="hvr-underline-from-left">Contact us</li>
          </a>
        </ul>
        <div className="navRight">
          <div className="navSearch ">
            <input
              type="text"
              placeholder="Search project"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={Search} alt="search" />
          </div>
          {searchTerm.length >= 3 && searchRes.length < 1 && (
            <div className="animate__animated animate__fadeIn navSearchRes">
              <div className="nsr-content">
                <div className="nr-content">
                  <p>
                    Sorry, we dont seem to have this project in our library.
                  </p>
                  <Link to="/postProject" className="nsr-btm">
                    <span>Add it to your library</span>
                    <img src={Add} alt="add" />
                  </Link>
                </div>
              </div>
            </div>
          )}
          {searchTerm.length >= 3 && searchRes.length >= 1 && (
            <div className="animate__animated animate__fadeIn navSearchRes">
              <div className="nsr-content">
                {isLoading ? (
                  <div className="spotsLoading-sm">
                    <CircularProgress color="inherit" size="25px" />
                  </div>
                ) : (
                  <div className="sr-content">
                    {searchRes.map((result) => (
                      <Link
                        to={`/buySpot/${result.id}`}
                        className="sr-single"
                        key={result.id}
                      >
                        <p>{result.projectName}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <Link to="/auth">
            <button className="nav_Connect">
              {!currentAccount
                ? 'Connect wallet'
                : shortenAddress(currentAccount)}
            </button>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default NavWeb
