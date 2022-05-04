import { useNavigate } from "react-router-dom"
import StrongestLinkApi from "../api/StrongestLinkApi"

const RegisterForm = () => {
  const nav = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    let registrationData = {
      username: evt.target.elements["username"].value,
      password1: evt.target.elements["password1"].value,
      password2: evt.target.elements["password2"].value,
    }
    const data = await StrongestLinkApi.register(registrationData);
    if (data) {
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("refresh_token", data.refresh_token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      nav("/login");
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <input id="username" name="username" type="text" placeholder="Username" required />
      <input id="password1" name="password" type="password" placeholder="Password" required minLength="8"/>
      <input id="password2" name="password" type="password" placeholder="Password (Again)" required minLength="8"/>
      <button className="btn" type="submit">Register</button>
    </form>
  )
}


export default RegisterForm;