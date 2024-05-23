import React from "react";
import { Carousel, Image } from "react-bootstrap";
import "../../../styles/homepage.css";

const ImageCarousel = () => {
  const numImages = 5;
  const images = Array.from({ length: numImages }, (_, i) => {
    const imageNumber = i + 1;
    return require(`../../../assets/images/herocarousel/${imageNumber}.png`);
  });

  const altTexts = [
    "Classroom image from Unsplash",
    "Placeholder image",
    "Placeholder image",
  ];

  return (
    <div className="image-carousel-container">
      <Carousel>
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            <Image
              className="d-block w-100"
              src={img}
              alt={altTexts[idx] || "Image slide"}
              fluid
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
