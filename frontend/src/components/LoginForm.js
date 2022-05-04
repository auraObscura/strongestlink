import { useNavigate } from "react-router-dom"
import StrongestLinkApi from "../api/StrongestLinkApi"

const LoginForm = (props) => {
  const nav = useNavigate();
  
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    let loginData = {
      username: evt.target.elements["username"].value,
      password: evt.target.elements["password"].value,
    }
    const data = await StrongestLinkApi.login(loginData);
    if (data) {
      props.setIsLoggedIn(true)
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("refresh_token", data.refresh_token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      nav("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <input id="username" name="username" type="text" placeholder="Username" />
      <input id="password" name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm;