import {useState, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { navData } from './nav-data'
import StrongestLinkApi from '../../api/StrongestLinkApi';
import './Navbar.css'

function Navbar(props) {

  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const data = await StrongestLinkApi.logout()
    if (data) {
      props.setUser(null)
      props.setIsLoggedIn(false)
      sessionStorage.clear()
      navigate('/')
    }
  }

  return (
    <div className='navbar-container'>
      <ul className='navbar-list'>
      {props.isLoggedIn && navData.map((item, i) => {
        return item.loggedin ? (
          <NavLink to={`${item.url}`} key={i} className="navbar-link" onClick={props.handleToggle}>
            <li className='navbar-list-item'>
              {item.name}
            </li>
          </NavLink>
        ) : null;
      })}
      {!props.isLoggedIn && navData.map((item, i) => {
        return !item.loggedin ? (
          <NavLink to={`${item.url}`} key={i} className="navbar-link" onClick={props.handleToggle}>
            <li className='navbar-list-item'>
              {item.name}
            </li>
          </NavLink>
        ) : null;
      })}
      {props.isLoggedIn && 
        <div className='loggedin-nav-container'>
            <NavLink to="#" className="navbar-link" onClick={handleLogout}>
            <li className="navbar-list-item">Logout</li>
          </NavLink>
        </div>
      }
      </ul>
    </div>
  )
}

export default Navbar