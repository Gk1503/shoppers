import React, { useState } from "react";
import "../Login/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCaretDown,
  faCircleQuestion,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import Google from "../../../Images/google.png";
// import Signup from "../../headder1/Login/Signup/Sign";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../../../utils/apiConfig";
import { checkLogin , createUser } from "../../../../utils/constant";

function Login(props) {
  const navigate = useNavigate();

  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(true);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleSiginClick = () => {
    setShowSignin(true);
    setShowSignup(false);
  };
  const handleCloseSignup = () => setShowSignup(false);

  const [FirstName, setFirstname] = useState("");
  const [Email, setEmail] = useState("");
  const [UserName, setUserName2] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const [Password, setPassword] = useState("");
  const [ConPassword, setConpassword] = useState("");
  const [ConpasswordError, setConpasswordError] = useState("");
  const [MobileNoError, setMobileNoError] = useState("");

  const [loginUsername, setLoginUsername] = useState(""); // For Login
  const [loginPassword, setLoginPassword] = useState("");

  const validatePassword = (password) => {
    if (!password) {
      return "Please Enter the password First";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long .";
    } else if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      return "Password must include at least one number.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      return "Password must include at least one special character (!@#$%^&*).";
    } else {
      return "";
    }
  };
  const validateMobileNo = (mobileNo) => {
    if (mobileNo.length < 10) {
      return "Mobile Number Must be 10 digit";
    }
  };



  const handleRegister = () => {

      const formdata ={ 
          Name : UserName ,
          MobileNo : MobileNo,
          Email : Email,
          Password : Password,
          ConfirmPassword : ConPassword
      };
    console.log("Sending Form Data:", formdata);

      apiConfig
      .post(createUser,formdata)
      .then((response) => {
          const {token , user} = response.data;
          console.log("Registration Success:",  user);
          localStorage.setItem("authToken",token);
          sessionStorage.setItem("Loginstatus" , "true");

          setShowSignup(false);
          props.setLoginstatus(true);
          // navigate("/");
        
      })
      .catch((error) =>{
        console.error("Registration Error: ", error.response?.data ||error.message);
      });
      


    const passwordValidationError = validatePassword(Password);
    setConpasswordError(passwordValidationError);

    const MobileNoValidationError = validateMobileNo(MobileNo);
    setMobileNoError(MobileNoValidationError);

    if (passwordValidationError || MobileNoValidationError) return;
    if (Password !== ConPassword) {
      setConpasswordError("Passwords do not match.");
      return;
    }


    // sessionStorage.setItem("Name", FirstName);
    // sessionStorage.setItem("Email", Email);
    // sessionStorage.setItem("username", UserName.toLowerCase());
    // sessionStorage.setItem("MobileNo", MobileNo);
    // sessionStorage.setItem("password", Password);
    // sessionStorage.setItem("Loginstatus", true);

    // alert("Registration Successful!");
    handleSiginClick();
    // navigate('/');
  };



  //Login Fucntion Starts from here 

const handleLogin = () => {
  const formdata = {
    Email: loginUsername.trim(),
    Password: loginPassword.trim(),
  };

  console.log("Sending login data:", formdata); // DEBUG

  apiConfig
    .post(checkLogin, formdata)
    .then((response) => {
      const {token , user} = response.data;
      console.log("Login Success:", user);
      localStorage.setItem("authToken",token);

      props.setLoginstatus(true);
      sessionStorage.setItem("Loginstatus",true);
      navigate("/");
    })
    .catch((error) => {
      console.error("Login Error:", error.response?.data || error.message); // Better error info
    });

  };

  return (
    <>
      <div id="login">
        <button
          class="btn "
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          {/* {" "} */}
          <FontAwesomeIcon icon={faUser} />
          &nbsp;&nbsp;&nbsp;Login&nbsp;
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      </div>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        // style={{ zIndex: 1000 }}
      >
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Show Signup Form on top of Login when state is true */}
          {showSignup ? (
            <div className="signup-modal">
              <button
                className="btn-close"
                onClick={handleCloseSignup}
              ></button>
              <h1>Create a New Account</h1>
              <input
                type="name"
                value={UserName}
                onChange={(e) => setUserName2(e.target.value)}
                id="signame"
                placeholder="Enter your Name"
              />
              <input
                type="Mobile Number"
                value={MobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                id="sigmbunber"
                placeholder="Enter Your Mobile Number"
              />
              {MobileNoError && (
                <div className="error-message" id="errormessage">
                  {MobileNoError}
                </div>
              )}
              <input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                id="sigemail"
                placeholder="Enter Your Email"
              />
              <input
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                id="sigcreatepass"
                placeholder="Create Your Password "
              />
              <input
                type="password"
                value={ConPassword}
                onChange={(e) => setConpassword(e.target.value)}
                id="sigconpass"
                placeholder="Confirm Your Password"
              />
              {ConpasswordError && (
                <div className="error-message" id="errormessage">
                  {ConpasswordError}
                </div>
              )}
              <button id="proceed" onClick={handleRegister}>
                SIGN UP
              </button>
              <div id="log">
                <br />
                <div id="log1"></div>
                <div id="logr">Or sign with</div>
                <div id="log2"></div>
              </div>
              <img id="googleSignup" src={Google} alt=".." />
              <div id="alreadylogin">
                Already have an Account?{" "}
                <span onClick={handleSiginClick}>Sign In</span>
              </div>
            </div>
          ) : (
            <>
              <h1 id="offcanvasRightLabel">Sign in to Shoppers Stop</h1>
              <br />
              <input
  type="email"
  value={loginUsername}
  onChange={(e) => setLoginUsername(e.target.value)}
  name="email"
  placeholder="Enter Your Email"
  id="email"
/>

              <input
                type="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                name="Password"
                placeholder="Enter Your Password"
                id="Password"
              />
              <button id="proceed" onClick={handleLogin}>
                PROCEED
              </button>

              <div id="log">
                <br />
                <div id="log1"></div>
                <div id="logr">Or sign with</div>
                <div id="log2"></div>
              </div>

              <img id="google" src={Google} alt=".." />
              <div id="donthave">
                Don't have an Account?{" "}
                <span onClick={handleSignupClick}>Sign up</span>
              </div>

              <div id="help">
                <FontAwesomeIcon icon={faCircleQuestion} /> Help
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Login;