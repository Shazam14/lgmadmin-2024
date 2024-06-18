import React from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import testimonials from "./TestimonialContentText";
import "../../../styles/homepage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  const renderImage = (idx) => {
    try {
      const imageUrl = require(`../../../assets/images/testimonial_img/testimonial_${
        idx + 1
      }.png`);
      return (
        <img
          src={imageUrl}
          alt={`Testimonial ${idx + 1}`}
          className="testimonial-image"
        />
      );
    } catch (error) {
      return <div className="testimonial-placeholder" />;
    }
  };

  return (
    <Container fluid>
      <div className="testimonial-carousel-container">
        <h1 className="display-6">Testimonial</h1>

        <Slider {...settings}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="testimonial-slide">
              <div className="testimonial-content">
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <p className="testimonial-author">{testimonial.author}</p>
              </div>
              <div className="testimonial-image-container">
                {renderImage(idx)}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default TestimonialCarousel;
