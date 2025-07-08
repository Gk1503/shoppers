import React, { useState } from "react";
import "./hoverslide.css";
import Aldo from "../Images/Aldo.avif";
import Time from "../Images/Time.avif";
import Vaya from "../Images/vaya.avif";
import Lavie from "../Images/Lavie.avif";
import Portico from "../Images/Portico.avif";

function Hoverslide() {
  const images = [
    { id: 1, src: Aldo, alt: "Aldo - Up to 40% Off" },
    { id: 2, src: Time, alt: "Time - Flat 50% Off" },
    { id: 3, src: Vaya, alt: "Vaya - Flat 30% Off" },
    { id: 4, src: Lavie, alt: "Lavie - Up to 20% Off" },
    { id: 5, src: Portico, alt: "Portico - Flat 10% Off" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container1">
      <h1>Scent-Sational Deals!</h1>
      <div className="carousel-wrapper1">
        <button className="carousel-button1 left" onClick={prevSlide}>
          &#8249;
        </button>
        <div className="carousel1">
          {images.map((image, index) => {
            // Determine the position class for each image
            let position =
              index === currentIndex
                ? "active"
                : index === (currentIndex - 1 + images.length) % images.length
                ? "prev"
                : index === (currentIndex + 1) % images.length
                ? "next"
                : "hidden";

            return (
              <div
                key={image.id}
                className={`carousel-item1 ${position}`}
              >
                <img src={image.src} alt={image.alt} />
                {position === "active" && (
                  <p className="carousel-caption1">{image.alt}</p>
                )}
              </div>
            );
          })}
        </div>
        <button className="carousel-button1 right" onClick={nextSlide}>
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default Hoverslide;
