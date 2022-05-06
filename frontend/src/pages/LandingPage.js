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
    <section>
    { props.isLoggedIn && <p>Excellent, welcome to the club{props.user ? `, ${props.user.username}!` : "!"}</p>}
    {/* <h2>This place is the best!  But you can't come in unless you have an account</h2> */}
    { props.isLoggedIn || <button className="btn secondary" onClick={handleRegister}>Register Account</button>}
    { props.isLoggedIn ? <button className="btn" onClick={handleLogout}>Logout</button> : <button className="btn" onClick={handleLogin}>Login</button>}
    <Outlet />
  </section>
  )
  
  
}


export default LandingPage