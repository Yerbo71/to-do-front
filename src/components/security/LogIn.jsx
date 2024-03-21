import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css";
import axios from "axios";
import erroricon from "./../../assets/red-x-icon.svg";

export default function LogIn() {
const [isError, setIsError] = useState(false);
const [errorMessage, setErrorMessage] = useState("Error")
const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:8080/auth/sign-in", values);
        localStorage.setItem("accessToken", res.data.token);
        console.log(localStorage.getItem("accessToken"));
        console.log("Login success: ", res);
        navigate("/home");
      } catch (e) {
        setIsError(true)
        setErrorMessage(e.response.data.message)
        console.log("Login failed: ", e);
      }
    },
  });



  return (
    <div className="main2">
      <div className="login-container">
        <div className="login-container2">
          {isError && <div className="ErrorMessage">
            <img src={erroricon} width={"20px"} height={"20px"} style={{marginRight:"5px"}}/>{errorMessage}</div>}
          <h1>Welcome back, User</h1>
          <p>Welcome back! Please enter your details.</p>
          <button className="btn-google2">Sign up with Google</button>
          <div className="or">
            <hr className="hrfirst" />
            <div>or</div>
            <hr className="hrfirst" />
          </div>

          <form onSubmit={formik.handleSubmit} className="form">
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              className="input-log"
              placeholder="  Username"
            />

            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="input-log"
              placeholder="  ********"
            />
            <div className="checkandforgot">
              <div className="remember">
                <input type="checkbox" id="checked" />
                <label>Remember me for 30 days</label>
              </div>
              <a href="#">Forgot Password</a>
            </div>
            <button type="submit" className="btn-sub">
              Log in
            </button>
          </form>
          <div className="linktoregister">
            Don't have an account ?{" "}
            <Link to="/signin" className="registerlink">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
