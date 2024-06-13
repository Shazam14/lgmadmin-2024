import React from "react";
import "../../../styles/course.css";
import { Card, Col, Container, Row } from "react-bootstrap";

const CASACurriculum = () => {
  return (
    <Container fluid>
      <section className="our-course-section">
        <div className="card-course-box">
          <h2 className="course-section-title">CASA CURRICULUM</h2>
          <div className="curriculum-grid">
            <div className="curriculum-item">
              <Card.Body>
                <div className="d-flex align-items-start mb-2">
                  <div className="icon me-2">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  </div>
                  <div>
                    <Card.Title className="course-section-text mb-0">
                      Practical Life
                    </Card.Title>
                    <Card.Text className="mt-1">
                      exercises build the children’s natural interest and help
                      them develop good work habits, concentration, eye-hand
                      coordination, a lengthened attention span, and control of
                      their bodies.
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </div>

            <div className="curriculum-item">
              <Card.Body>
                <div className="d-flex align-items-start mb-2">
                  <div className="icon me-2">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  </div>
                  <div>
                    <Card.Title className="course-section-text mb-0">
                      Sensorial Materials
                    </Card.Title>
                    <Card.Text className="mt-1">
                      are designed to help the children develop their abilities
                      to make judgments, compare, and discriminate based on
                      size, shape, weight, texture, color, and temperature;
                      store up impressions in their muscular memory and develop
                      the use of certain muscles and motions.
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </div>

            <div className="curriculum-item">
              <Card.Body>
                <div className="d-flex align-items-start mb-2">
                  <div className="icon me-2">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  </div>
                  <div>
                    <Card.Title className="course-section-text mb-0">
                      The Language
                    </Card.Title>
                    <Card.Text className="mt-1">
                      area allows the children to experience conversations,
                      stories, and poetry. The sandpaper letters help children
                      link the sound and symbol effortlessly, encouraging the
                      development of written expression and reading skills. To
                      further reading development, children are exposed to the
                      study of grammar.
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </div>

            <div className="curriculum-item">
              <Card.Body>
                <div className="d-flex align-items-start mb-2">
                  <div className="icon me-2">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  </div>
                  <div>
                    <Row>
                      <Col>
                        <Card.Title className="course-section-text mb-0">
                          Geography | Botany | Zoology | Art | Music
                        </Card.Title>
                      </Col>
                    </Row>
                    <Card.Text className="mt-1">
                      are presented as extensions of the sensorial and language
                      activities. Children learn about people and cultures in
                      other countries with an attitude of respect and
                      admiration.
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </div>

            <div className="curriculum-item">
              <Card.Body>
                <div className="d-flex align-items-start mb-2">
                  <div className="icon me-2">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  </div>
                  <div>
                    <Card.Title className="course-section-text mb-0">
                      Mathematics
                    </Card.Title>
                    <Card.Text className="mt-1">
                      activities help children learn and understand the concepts
                      of math by manipulating concrete materials. This work
                      gives children a solid understanding of basic mathematical
                      principles prepares them for later abstract reasoning and
                      helps in developing their problem-solving capabilities.
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default CASACurriculum;
