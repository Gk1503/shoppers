import React from "react";
import "../Carsoul/Carsoul.css";
import Carsoul1 from "../Images/Carsoul1.avif";
import Carsoul2 from "../Images/Carsoul2.avif";
import Carsoul3 from "../Images/Carsoul3.avif";

function Carsoul(){
    return(
        <>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={Carsoul1} class="d-block " alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={Carsoul2} class="d-block" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={Carsoul3} class="d-block " alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
       </>
    );
}

export default Carsoul;