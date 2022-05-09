import {useState, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { navData } from './nav-data'
import StrongestLinkApi from '../../api/StrongestLinkApi';
import './Navbar.css'
import { Switch } from "@mui/material";

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

  const handleTheme = (e) => {
    setChecked(e.target.checked);
  }

  const onModeToggle = () => {
    props.setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  return (
    <div className='navbar-container'>
      <ul className='navbar-list'>
      {props.isLoggedIn && navData.map((item, i) => {
        return item.loggedin ? (
          <NavLink className={({ isActive }) => isActive ? "navbar-link selected" : "navbar-link"}
          to={`${item.url}`} key={i} onClick={props.handleToggle}>
            <li className='navbar-list-item'>
              {item.name}
            </li>
          </NavLink>
        ) : null;
      })}
      {!props.isLoggedIn && navData.map((item, i) => {
        return !item.loggedin ? (
          <NavLink className={({ isActive }) => isActive ? "navbar-link selected" : "navbar-link"} to={`${item.url}`} key={i} onClick={props.handleToggle}>
            <li className='navbar-list-item'>
              {item.name}
            </li>
          </NavLink>
        ) : null;
      })}
      {props.isLoggedIn && 
        <div className='loggedin-nav-container'>
            <NavLink className="navbar-link" to="#" onClick={handleLogout}>
            <li className="navbar-list-item">Logout</li>
          </NavLink>
        </div>
      }
      <Switch
            color='default'
            size="small"
            checked={checked}
            onChange={handleTheme}
            onClick={e => {onModeToggle(e); props.handleToggle(e)}}
            className="theme-toggle"
          />
      </ul>
    </div>
  )
}

export default Navbar