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

  // Placeholder images or URLs of real images
  const images = [
    "https://images.unsplash.com/photo-1527822618093-743f3e57977c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyN3x8Z3JhZGUlMjBzY2hvb2wlMjBzdHVkZW50c3xlbnwxfHx8fDE3MTA1NTE0NTl8MA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://via.placeholder.com/1440x671", // Placeholder for image 2
    "https://via.placeholder.com/1440x671", // Placeholder for image 3
  ];

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
