import { Outlet, useNavigate } from "react-router-dom"
import StrongestLinkApi from "../api/StrongestLinkApi";

const LandingPage = (props) => {
  const nav = useNavigate();
  const handleRegister = () => {
    nav("register")
  }
  const handleLogin = () => {
    nav("login")
  }
  const handleLogout = async () => {
    sessionStorage.clear()
    props.setIsLoggedIn(false)
    return await StrongestLinkApi.logout()
  }

  return (
    <div>
    { props.isLoggedIn && <p>Excellent, welcome to the club{props.user ? `, ${props.user}!` : "!"}</p>}
    <p>This place is the best.  But you can't come in unless you have an account</p>
    { props.isLoggedIn || <button onClick={handleRegister}>Register Account</button>}
    { props.isLoggedIn ? <button onClick={handleLogout}>Logout</button> : <button onClick={handleLogin}>Login</button>}
    <Outlet />
  </div>
  )
  
  
}


export default LandingPage