import React from "react";
import Slider from "react-slick";
import "../../../styles/homepage.css"; // This is where we'll put the CSS styling

// Component for individual image slide
const ImageSlide = ({ image, altText }) => (
  <div className="image-slide">
    <img
      src={image}
      alt={altText || "Image slide"} // Added for debugging
    />
  </div>
);

// The carousel component itself
const ImageCarousel = () => {
  // Your settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const numImages = 5;

  // Placeholder images or URLs of real images
  const images = Array.from({ length: numImages }, (_, i) => {
    const imageNumber = i + 1;
    return require(`../../../assets/images/herocarousel/${imageNumber}.png`);
  });

  const altTexts = [
    "Classroom image from Unsplash", // Alt text for the first image
    "Placeholder image", // Alt text for the second image
    "Placeholder image", // Alt text for the third image
  ];

  return (
    <div className="image-carousel-container">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <ImageSlide key={idx} image={img} altText={altTexts[idx]} />
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
