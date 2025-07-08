import React from "react";
import "../Footer/Foot.css" ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTape,faArrowRightArrowLeft,faVanShuttle,faShirt,faPersonDress,faBagShopping } from "@fortawesome/free-solid-svg-icons";


function Footer() { 

    return(
        <>
        
        <h2 id="OurUnique">Our Unique &nbsp;<span>offerings</span></h2>
        <div id="footeritems">
            <div><FontAwesomeIcon className="tape" icon={faTape} /> Free Alterations</div>
            <div><FontAwesomeIcon className="tape" icon={faArrowRightArrowLeft} /> &nbsp;&nbsp;Easy Exchange & &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return </div>
            <div><FontAwesomeIcon className="tape" icon={faVanShuttle} />&nbsp;&nbsp;Express Delivery</div>
            <div><FontAwesomeIcon icon={faShirt} className="tape" />Personalized &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engraving</div>
            <div> <FontAwesomeIcon icon={faPersonDress} className="tape" /> Curated Styling &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advance</div>
            <div><FontAwesomeIcon icon={faBagShopping} className="tape" /> Click & Collect</div>
                    </div>

        <div className="footerdes">
            <div id="Get">
                <h5>Get to Know</h5>
                <ul className="ullist">
                    <li>About Amazom</li>
                    <li>Careers</li>
                    <li>Press Releases</li>
                    <li>Amazon Science</li>
                    
                </ul>
            </div>
            <div id="Conn">
            <h5>Connect With Us</h5>
                <ul className="ullist">
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                    
                    
                </ul>
            </div>
            <div id="MakeMoney">
            <h5>Make Money With Us</h5>
                <ul className="ullist">
                    <li>Sell on Amazon</li>
                    <li>Sell Under Amazon</li>
                    <li>Protect and Build Your Brand</li>
                    <li>Amazon Global</li>
                    <li>Supply to Amazon</li>
                    <li>Become an Affiliate</li>
                    <li>Fulifilment by Amazon</li>
                    <li>Advertise Your Products</li>
                    <li>Amazon Pay On Merchants</li>                    
                </ul>
            </div>
            <div id="letus">
                <h5>Let Us Help You</h5>
                <ul className="ullist">
                    <li>Your Account </li>
                    <li>Returns Centre</li>
                    <li>Recalls and Product Safety</li>
                    <li>100% Purchase Protection</li>
                    <li>Amazon App Download</li>
                    <li>Help</li>

                </ul>
            </div>

            </div>  
        </>


    )



 }
 export default Footer;