import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/about.css";
import excellenceIcon from "../../assets/images/about_img/excellence.png";
import respectIcon from "../../assets/images/about_img/respect.png";
import integrityIcon from "../../assets/images/about_img/integrity.png";
import compassionIcon from "../../assets/images/about_img/compassion.png";
import commitmentIcon from "../../assets/images/about_img/commitment.png";
import accountabilityIcon from "../../assets/images/about_img/accountability.png";

const MissionVision = () => {
  return (
    <div className="card-course-box" style={{ margin: "20px 0 0 0" }}>
      <Container fluid>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title className="h3-mission-vision">MISSION</Card.Title>
              <Card.Text className="mission-text">
              <span style={{ display: 'block', marginBottom: '1rem' }}>
                  We are committed to developing compassionate global citizens
                  with a sense of responsibility, integrity, inner discipline,
                  and c reativity.
                </span>
                <span style={{ display: 'block', marginBottom: '1rem' }}>
                  We are committed to preparing them to confidently enhance
                  challenges and the child’s potential to the fullest extent
                  possible through a rich comprehensive curriculum in a prepared
                  environment.
                </span>
              </Card.Text>
            </Card.Body>
          </Col>
          <Col>
            <Card.Body>
              <Card.Title className="h3-mission-vision">VISION</Card.Title>
              <Card.Text className="vision-text">
              <span style={{ display: 'block', marginBottom: '1rem' }}>
                  Learning Garden Montessori School envisions learners who are
                  holistically developed, globally competitive, and good
                  stewards of the Earth with great love for the country and
                  strong faith in God who will be movers of the future
                  </span>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Card.Body>
              <Row className="core-value-row">
                <Col className="core-value-item">
                  <img
                    className="core-value-icon"
                    src={excellenceIcon}
                    alt="Excellence"
                  />
                  <Card.Title className="core-value-text">
                    EXCELLENCE
                  </Card.Title>
                  <Card.Text className="core-value-description">
                    Strive to be the best in everything we do.
                  </Card.Text>
                </Col>
                <Col className="core-value-item">
                  <img
                    className="core-value-icon"
                    src={respectIcon}
                    alt="Respect"
                  />
                  <Card.Title className="core-value-text">RESPECT</Card.Title>
                  <Card.Text className="core-value-description">
                    Giving due respect to self and others and practices good
                    manners in words and actions.
                  </Card.Text>
                </Col>
                <Col className="core-value-item">
                  <img
                    className="core-value-icon"
                    src={integrityIcon}
                    alt="Integrity"
                  />
                  <Card.Title className="core-value-text">INTEGRITY</Card.Title>
                  <Card.Text className="core-value-description">
                    To act fairly and honestly without compromising one's
                    values.
                  </Card.Text>
                </Col>
              </Row>
              <Row className="core-value-row">
                <Col className="core-value-item">
                  <img
                    className="core-value-icon"
                    src={compassionIcon}
                    alt="Compassion"
                  />
                  <Card.Title className="core-value-text">
                    COMPASSION
                  </Card.Title>
                  <Card.Text className="core-value-description">
                    For those who are less fortunate, we are COMMITTED to
                    transform the situation for the better.
                  </Card.Text>
                </Col>
                <Col className="core-value-item">
                  <img
                    className="core-value-icon"
                    src={commitmentIcon}
                    alt="Commitment"
                  />
                  <Card.Title className="core-value-text">
                    COMMITMENT
                  </Card.Title>
                  <Card.Text className="core-value-description">
                    Passionately doing things wholeheartedly.
                  </Card.Text>
                </Col>
                <Col className="core-value-item">
                  <img
                    className="core-value-icon"
                    src={accountabilityIcon}
                    alt="Accountability"
                  />
                  <Card.Title className="core-value-text">
                    ACCOUNTABILITY
                  </Card.Title>
                  <Card.Text className="core-value-description">
                    Being responsible and taking ownership for our actions.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MissionVision;
