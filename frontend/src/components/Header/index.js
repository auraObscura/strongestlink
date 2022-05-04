import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar'
import './Header.css'
import logo from '../../assets/logo.png'

function Header(props) {

  const [navbarOpen, setNavbarOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const isMobile = width < 768 ? true : false;

  useEffect (() => {
    const updateWindow = () => {
      setWidth(window.innerWidth)
    };

    window.addEventListener("resize", updateWindow)

    return () => window.removeEventListener("resize", updateWindow)
  }, [])

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }

  return (
    <div className='header-container'>
      <div className='header-head'>
        <div className='logo-container'>
          <Link to="/" className="logo">
            <img className="logo-img" src={logo} alt="Strongest Link" />
          </Link>
        </div>
        {isMobile && 
          <button className='toggler-btn' aria-controls="navbarDropdown" onClick={handleToggle}>
            {navbarOpen
              ? <FontAwesomeIcon className="toggler bars" icon={faXmark} />
              : <FaBars className="toggler bars" />
            }
          </button>
        }
      {!isMobile && 
        <Navbar isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} user={props.user} setUser={props.setUser} handleToggle={handleToggle} />
      }
      </div>
      {navbarOpen && isMobile && <Navbar isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} user={props.user} setUser={props.setUser} handleToggle={handleToggle} /> }
    </div>
  )
}

export default Header