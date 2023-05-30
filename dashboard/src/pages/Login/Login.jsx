import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { login } from "../../context/authContext/apiCalls";
import  AuthContext  from "../../context/authContext/AuthContext";
import './login.css'
import nimetlogo1 from '../../assets/images/nimet-logo.png'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    login({ username, password }, dispatch);
  };

  return (
    <div className="login">
      <form className="loginForm">
      <img className="mb-4 logo" src={nimetlogo1}
       alt="" width="250" height="125" />
         <div className="div form-floating">
        <input
          type="text"
          placeholder="username"
          id="floatingInput"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label for="floatingInput">Username</label>
        </div>
        <div className="div form-floating">
        <input
          type="password"
          placeholder="password"
          className="form-control"
          id="floatingPassword"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label for="floatingPassword">Password</label>
        </div>
        <button
          className="w-100 btn btn-lg btn-success"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2022 Nigerian Meteorological Agency</p>
        <p className="text-muted"><center>All Rights Reserved</center></p>
      </form>
    </div>
  );
}
