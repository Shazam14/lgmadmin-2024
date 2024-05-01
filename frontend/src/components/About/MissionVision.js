import React from "react";
import "../../styles/about.css";
import excellenceIcon from "../../assets/images/about_img/excellence.png";
import respectIcon from "../../assets/images/about_img/respect.png";
import integrityIcon from "../../assets/images/about_img/integrity.png";
import compassionIcon from "../../assets/images/about_img/compassion.png";
import commitmentIcon from "../../assets/images/about_img/commitment.png";
import accountabilityIcon from "../../assets/images/about_img/accountability.png";

const MissionVision = () => {
  return (
    <div className="vision-mission-section">
      <div className="vision-mission-container">
        <div className="vision-mission-text">
          <h3 className="h3-mission-vision">MISSION</h3>
          <p className="mission-text">
            Guided by its commitment to excellence, Learning Garden Montessori
            School envisions to develop integrity, respect, and accountability
            in the learners to achieve prepared environment.
          </p>
        </div>
        <div className="vision-mission-text">
          <h3 className="h3-mission-vision">VISION</h3>
          <p className="vision-text">
            Learning Garden Montessori School envisions to be a formation center
            that strives for students' academic and social values to be great
            citizens.
          </p>
        </div>
      </div>
      <div className="core-values-container">
        <div className="core-values-card">
          <div className="core-value-row">
            <div className="core-value-item">
              <img
                className="core-value-icon"
                src={excellenceIcon}
                alt="Excellence"
              />
              <p className="core-value-text">EXCELLENCE</p>
              <p className="core-value-description">
                Strive to be the best in everything we do.
              </p>
            </div>
            <div className="core-value-item">
              <img
                className="core-value-icon"
                src={respectIcon}
                alt="Respect"
              />
              <p className="core-value-text">RESPECT</p>
              <p className="core-value-description">
                Giving due respect to self and others and practices good manners
                in words and actions.
              </p>
            </div>
            <div className="core-value-item">
              <img
                className="core-value-icon"
                src={integrityIcon}
                alt="Integrity"
              />
              <p className="core-value-text">INTEGRITY</p>
              <p className="core-value-description">
                To act fairly and honestly without compromising one's values.
              </p>
            </div>
          </div>
          <div className="core-value-row">
            <div className="core-value-item">
              <img
                className="core-value-icon"
                src={compassionIcon}
                alt="Compassion"
              />
              <p className="core-value-text">COMPASSION</p>
              <p className="core-value-description">
                For those who are less fortunate, we are COMMITTED to transform
                the situation for the better.
              </p>
            </div>
            <div className="core-value-item">
              <img
                className="core-value-icon"
                src={commitmentIcon}
                alt="Commitment"
              />
              <p className="core-value-text">COMMITMENT</p>
              <p className="core-value-description">
                Passionately doing things wholeheartedly.
              </p>
            </div>
            <div className="core-value-item">
              <img
                className="core-value-icon"
                src={accountabilityIcon}
                alt="Accountability"
              />
              <p className="core-value-text">ACCOUNTABILITY</p>
              <p className="core-value-description">
                Being responsible and taking ownership for our actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MissionVision;
