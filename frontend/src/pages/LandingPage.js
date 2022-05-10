import { Outlet, useNavigate } from "react-router-dom"
import StrongestLinkApi from "../api/StrongestLinkApi";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import LandingLoggedOut from "../components/LandingLoggedOut/LandingLoggedOut";

const LandingPage = (props) => {

  const [profiles, setProfiles] = useState("")


  useEffect(() => {
    loadAllUserProfiles()
  }, [props.user])

  const loadAllUserProfiles = async () => {
    const response = await StrongestLinkApi.getAllUserProfiles()
    if(response){
      setProfiles(response)
    }
  }
  
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
      { props.isLoggedIn && <p>Welcome to the club{props.user ? `, ${props.user.username.charAt(0).toUpperCase()+props.user.username.slice(1,) }!` : "!"}</p>}
      {(props.isLoggedIn && profiles) && <SearchBar profiles = {profiles}/>}
      { props.isLoggedIn && <button className="btn primary" onClick={handleLogout}>Logout</button> }


    {!props.isLoggedIn && <LandingLoggedOut />}
    {!props.isLoggedIn && <div className="btn-container">
      <button className="btn secondary" onClick={handleRegister}>Register Account</button>
      <button className="btn primary" onClick={handleLogin}>Login</button>
    </div>}
  </section>
  )

  
}


export default LandingPage
