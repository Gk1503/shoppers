import React from "react";
import Carsoul21img from "../../Images/Carsoul21.avif";
import Carsoul22img from "../../Images/Carsoul22.avif";
import Carsoul23img from "../../Images/Carsoul23.avif";
import "../Carsoul2/Carsoul2.css";

function Carsoul2(){

    return(

        <>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={Carsoul21img} class="d-block" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={Carsoul22img} class="d-block" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={Carsoul23img} class="d-block " alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


        </>
    );


}

export default Carsoul2;