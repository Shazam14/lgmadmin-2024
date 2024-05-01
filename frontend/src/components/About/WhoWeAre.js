import React from "react";
import "../../styles/about.css";
import schoolImage from "../../assets/images/about_img/schoolbldg.jpeg";

const WhoWeAre = () => {
  return (
    <div className="who-we-are-section">
      <div className="who-we-are-card-container">
        <div className="who-we-are-content">
          <h3 className="who-we-are-header">Who we are</h3>
          <p className="who-we-are-text">
            LGMS is a non-stock, and non-sectarian family-owned educational
            institution, which started January of 2000.The school started with a
            small group of students on a rented bungalow house in Quinta
            society, where our main building now is situated. As a continuing
            service for the students and parents, LGMS purchased the house and
            lot, demolished the bungalow house and built a new building in 2000
            to cater to the growing population. From then on, yearly renovations
            and building improvements are being done.
          </p>
        </div>
        <img
          className="who-we-are-image"
          src={schoolImage}
          alt="School Building"
        />
      </div>
    </div>
  );
};

export default WhoWeAre;
