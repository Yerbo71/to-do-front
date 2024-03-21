import axios from "axios";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import "./SignIn.css";
import successicon from "./../../assets/done-icon.svg";
import erroricon from "./../../assets/red-x-icon.svg";



function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }
  
  function validatePassword(value) {
    let error;
    if (!value || value.length < 8) {
      error = "Must be at least 8 characters";
    }
    return error;
  }
  
  function validateName(value) {
    let error;
    if (!value || value.length < 5) {
      error = "Required";
    }
    return error;
  }
  
function SignIn () {
    const [isSignIn, setIsSignIn] = useState(false);
    const [NotSignIn, setNotSignIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState(" Error!");

    const getRegistration  = async (values) => {
        try{
            const res = await axios.post("http://localhost:8080/auth/sign-up",values);
            console.log("Sign in success: ", res);
            setIsSignIn(true);
        } catch(error) {
            setNotSignIn(true);
            setErrorMessage(error.response.data.message)
            console.error("Sign in is failed: " , error);
        }
    };


    return(
    <div className="display-container">
        <div className="main-container">
          <div className="preForm-container">{
            isSignIn && <div className="IsSignIn"><img src={successicon} width={"20px"} height={"20px"} style={{
              marginRight:"5px",
            }}/> Success !</div>
          }
          {
            NotSignIn && <div className="NotSignIn"><img src={erroricon} width={"20px"} height={"20px"} style={{
              marginRight:"5px",
            }}/> {errorMessage} </div>
          }
            <h1>Create an account</h1>
            <p>Lets get started with your 30 days free trial.</p>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                getRegistration(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="form-container">
                  <Field name="username" validate={validateName} className="input-field" placeholder="  Username" />
                  {errors.username && touched.username && <div className="error">{errors.username}</div>}
  
                  <Field name="email" validate={validateEmail} className="input-field" placeholder="  Email" />
                  {errors.email && touched.email && <div className="error">{errors.email}</div>}
  
                  <Field name="password" validate={validatePassword} className="input-field" placeholder="  Password" />
                  {errors.password && touched.password && <div className="error">{errors.password}</div>}
  
                  <button type="submit" className="btn-sub">
                    Create account
                  </button>
                </Form>
              )}
            </Formik>
            <button className="btn-google">Sign up with Google</button>
            <div className="link-login">
              Already have an account? <Link to="/" className="loginlink">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    );
}
export  default SignIn; 