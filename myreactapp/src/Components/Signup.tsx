import axios from "axios";
import { useState } from "react";
import LoginLogic from "./LoginLogic";

const Signup = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [password, setpassword] = useState();

  function onNameChange(event: any) {
    setname(event.target.value);
  }
  function onEmailChange(event: any) {
    setemail(event.target.value);
  }
  function onPhoneChange(event: any) {
    setphone(event.target.value);
  }
  function onPasswordChange(event: any) {
    setpassword(event.target.value);
  }
  function onSubmit(event: any) {
    event.preventDefault();
    let form = new FormData();
    form.append("name", name!);
    form.append("email", email!);
    form.append("phone", phone!);
    form.append("password", password!);
    axios.post("http://127.0.0.1:5000/signup/", form).then((response) => {
      console.log(response.data);
    });
  }
  return (
    <> <div className="jc-center"
    style={{ position: "absolute", top:6, right: 2 }}
    ><a href="/">
    <button className="Login">
      <b>LOGIN</b>
    </button>
  </a>
</div>
    <LoginLogic /><div className="container col-4 mt-3 mb-3 p-4 " style={{ border: "solid", textAlign: "center" }}>
      <h2>SIGNUP PAGE</h2>
      <form method="POST">
        <div className="form-group">
          <input
            onChange={onNameChange}
            type="text"
            className="form-control"
            value={name}
            placeholder="Enter username"
            name="name"
            required />
        </div>
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
            onChange={onPhoneChange}
            type="number"
            className="form-control"
            placeholder="Enter Phone Number"
            name="phone"
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
        <button type="submit" className="btn btn-info" onClick={onSubmit}>
          Signup
        </button>
      </form>
    </div></>
  );
};
export default Signup;
