import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginLogic from "./LoginLogic";


const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const history = useHistory();

  function onEmailChange(event: any) {
    setemail(event.target.value);
  }
  function onPasswordChange(event: any) {
    setpassword(event.target.value);
  }
  function onSubmit(event: any) {
    event.preventDefault();
    let form = new FormData();
    form.append("email", email!);
    form.append("password", password!);
    axios.post("http://127.0.0.1:5000/login/", form).then((response) => {
      if (response.data.logged_in === "True") {
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("loggedin", "True");
        localStorage.setItem("token", response.data.auth_token)
        history.push("/home");
      } else  {
        localStorage.setItem("loggedin","False" ); 
        history.push("/");
      }
    });
  }

  return (
    <><div className="jc-center"
    style={{ position: "absolute", top:6, right: 2 }}>
    <a href="/signup">
      <button className="Login">
        <b>SIGNUP</b>
      </button>
    </a></div>
    <LoginLogic />
    <div
      className="container col-4 mt-3 mb-3 p-4 "
      style={{ border: "solid", textAlign: "center" }}
    >
      <h2>LOGIN PAGE</h2>
      <form method="POST">
        <div className="form-group">
          <input
            onChange={onEmailChange}
            type="email"
            className="form-control"
            placeholder="Enter Email"
            name="email"
            required />
        </div>
        <div className="form-group">
          <input
            onChange={onPasswordChange}
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            required />
        </div>
        <button type="submit" className="btn btn-info " onClick={onSubmit}>
          Login
        </button>
      </form>
    </div></>
  );
};

export default Login;
