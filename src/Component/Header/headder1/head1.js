import React from "react";
import "../headder1/head1.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Caart from "../../CartManagement/cart";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CompanyLogo from "../../Images/CompanyLogo.png";
import SearchBar from "../headder1/Searchbar/search";
import FashionStyle from "../../Images/FashionStyle.webp";
import Login from "../headder1/Login/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faBagShopping,
  faCircleUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "../../Header/headder1/MyProfile/Profile";
// import { Offcanvas } from "bootstrap";

function Headder1() {
  // const navigate = useNavigate();
  const [displayprofile, setDissplayProfile] = useState(false);
  const [showproile, setShowprofile] = useState(false);
  const [showproilePopup, setShowprofilePopup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showcart, setshowcartdisplay] = useState(false);
 

  const togglePopup = () => {
    setShowprofilePopup(true);
  };

  const toggleCart = () => {
    setshowcartdisplay(!showcart);
  };


  const handlelogut = () => {
    setLoginstatus(false);
    setDissplayProfile(false);
  };
  const ShowProfile = () => {
    setShowprofile(!showproile);
  };

  const [Loginstatus, setLoginstatus] = useState(false);
  const [username, storedUsername] = useState("");

  useEffect(() => {
    const status = sessionStorage.getItem("Loginstatus");

    const savedusername = sessionStorage.getItem("username");
setLoginstatus(status === "true");

    if (savedusername) {
      storedUsername(savedusername);
    }
  }, []);

  return (
    <>
      <div class="container-fluid">
        {displayprofile && <Profile togglePopup={togglePopup} />}
        

        <div id="nav1">
          <div>
            {" "}
            <img id="CompanyLogo" src={CompanyLogo} alt="..." />
          </div>
          <div id="searchbar">{<SearchBar />}</div>
          <div>
            <img id="fasionstyle" src={FashionStyle} alt="..." />
          </div>
          {!Loginstatus ? (
            <div>{<Login setLoginstatus={setLoginstatus} storedUsername={storedUsername} />}</div>
          ) : (
            <>
              <div id="Afterlogin">
                <div id="btns">
                  <div id="myaccount" onClick={ShowProfile}>
                    <FontAwesomeIcon id="circlecolor" icon={faCircleUser} />
                    &nbsp;&nbsp;My Account v |
                  </div>
                  {showproile ? (
                    <>
                      <ul id="profiledisplay">
                        <li className="Profile">
                          <Profile />
                        </li>
                        <li className="OrderHistory">Order History</li>
                        {/* <li className="Profile"> <button onClick={togglePopup} class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Profile</button></li> */}
                        <li className="Logout" onClick={handlelogut}>
                          Logout
                        </li>
                        
                      </ul>
                    </>
                  ) : null}
                </div>
              </div>
            </>
          )}
          <div id="font">
            
          
            <div>
              <FontAwesomeIcon icon={faBagShopping} />
            </div>

          
            <div id="cart">
               <FontAwesomeIcon  icon={faCartShopping} onClick={toggleCart}/>
               { showcart && <Caart />

               }
              
            </div>

           


          </div>
        </div>
      </div>
    </>
  );
}

export default Headder1; 