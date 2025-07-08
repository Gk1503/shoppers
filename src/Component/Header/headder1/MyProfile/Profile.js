import React, { useEffect,useState } from "react";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import apiConfig from "../../../../utils/apiConfig";
import {updateProfile } from "../../../../utils/constant";



function  Profile(props) {

    const [FirstName ,setFirstname] = useState("");
        const [Email ,setEmail] = useState("");
        const [UserName ,setUserName2] = useState("");
        const [MobileNo ,setMobileNo] = useState("");
        const [Password ,setPassword] = useState("");
        const [ConPassword ,setConpassword] = useState("");
        const [ConpasswordError , setConpasswordError] = useState ("");
        const [MobileNoError , setMobileNoError] = useState ("") ;
    
useEffect(()=>{

    setUserName2(sessionStorage.getItem("username") || "");
    setEmail(sessionStorage.getItem("Email") || "");
    setPassword(sessionStorage.getItem("password")||"");
    setConpassword(sessionStorage.getItem("conpassword")|| "");
    setMobileNo(sessionStorage.getItem("MobileNo")||"");

},[]);



const validatePassword =(password) => {
    if(password===""){
        return "Please Enter the password First" ;
    }
    if(password.length < 8){
        return "Password must be at least 8 characters long .";
    }
    else if(!/[A-Z]/.test(password)){
        return "Password must include at least one uppercase letter.";
    }
    else if (!/[a-z]/.test(password)) {
        return "Password must include at least one lowercase letter.";
    }
    else if (!/[0-9]/.test(password)) {
        return "Password must include at least one number.";
    }
     else if (!/[!@#$%^&*]/.test(password)) {
        return "Password must include at least one special character (!@#$%^&*).";
    }
else{
    return "" ;
    }

}

const validateMobileNo =(mobileNo)=>{
    if(mobileNo.length < 10){
        return "Mobile Number Must be 10 digit" ;
    }
}

const handleSave = () => {
  const passwordValidationError = validatePassword(Password);
  const MobileNoValidationError = validateMobileNo(MobileNo);

  setConpasswordError(passwordValidationError);
  setMobileNoError(MobileNoValidationError);

  if (passwordValidationError || MobileNoValidationError) return;

  if (Password !== ConPassword) {
    setConpasswordError("Passwords do not match.");
    return;
  }

  const formdata = {
    Email: Email,
    MobileNo: MobileNo,
    Password: Password,
    ConfirmPassword: ConPassword
  };

  console.log("Update Profile Data:", formdata);

  const token = localStorage.getItem("authToken");

  apiConfig
    .post(updateProfile, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const { user } = response.data;
      console.log("Profile Updated Success:", user);
      alert("Profile updated successfully!");
    })
    .catch((error) => {
      console.error("Profile Update Error:", error.response?.data || error.message);
    });
};

    return(

        <>
            <button class="btn btn-primary Profilebtn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Profile</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
<h3>Update Profile</h3>
    <input type="text" id="usname" className="inputfield" value={UserName} disabled onChange={(e)=>setUserName2(e.target.value)}  ></input><br></br><br></br>
    <input type="Email" id="Email" className="inputfield"  disabled value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"></input><br/><br/>
    <input type="text" className="inputfield"  value={MobileNo} onChange={(e)=>setMobileNo(e.target.value)} placeholder="Enter Your Phone Number"></input><br/><br/>
    {MobileNoError&& (
                                <div className="error-message" id="errormessage">{MobileNoError}</div>
                                
                            )}
                            <br/>
                            <input type="password" className="inputfield" value={Password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"></input><br/><br/>
                            <input type="password" className="inputfield" value={ConPassword} onChange={(e)=>setConpassword(e.target.value)} placeholder="ReEnter Your Password"></input><br></br><br></br>
        {ConpasswordError && (
                                <div className="error-message" id="errormessage">{ConpasswordError}</div>
                                
                            )}  
    <button type="button" class=" cl" data-bs-dismiss="offcanvas" >Close</button>
    <button id="sc" onClick={handleSave} >Save Changes</button>                     
  </div>
</div>

        </>
    )

  }

  export default Profile;