import React from "react";
import "../Homepage/Home.css";
import Head1 from "../Header/headder1/head1";
import Tophead from "../Header/tophead/tophead";
import Head2 from "../Header/headder2/Head2";
import Fab from "../FabSale/fabsale";
import Carsoul from "../Carsoul/Carsoul";
import Carsoul2 from "../Carsoul/Carsoul2/Carsoul2";
import FeaturesBrand from "../FeaturesBrand/Fb";
import HoverSlide from "../hoverslide/hoverslide";
import Footer from "../Footer/Foot";
import ProductDisplay from "../ProductDisplay/Pd";

import Checkout from "../Checkout/Checkout";

function Home(){




    return(
        <>
        {/* <div className="container-fluid"> */}
        {/* <div className="row"> */}
            {/* <div className="col-md-12"> */}
            <div id="header">
            <div>{<Tophead/>}</div>
            <div>{<Head1/>}</div>
            <div id="head22">{<Head2/>}</div>
            </div>
            <div>{<Fab/>}</div>
            <div>{<Carsoul/>}</div>
            <div>{<ProductDisplay/>}</div>
            <div>{<Carsoul2/>}</div>
            <div>{<FeaturesBrand/>}</div>
            <div>{<HoverSlide/>}</div>
            {/* <div>{<Checkout/>}</div> */}
            <div>{<Footer/>}</div>
           
            
        </>

    );


}
export default Home;