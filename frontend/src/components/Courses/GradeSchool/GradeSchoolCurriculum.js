import React from "react";
import "../../../styles/course.css";
import { Card, Container, Row, Col } from "react-bootstrap";

const GradeSchoolCurriculum = () => {
  return (
    <Container fluid>
      <section className="our-course-section">
        <div className="card-course-box">
          <h2 className="course-section-title">GRADE SCHOOL CURRICULUM</h2>
          <span className="course-section-text">
            LGMS will provide Certification
          </span>
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
                      <Row>
                        <Col>
                          <Card.Title className="course-section-text mb-0">
                            Languages | Mathematics | Zoology | Botany | History
                            | Geography
                          </Card.Title>
                        </Col>
                      </Row>
                      <Card.Text className="mt-1">
                        presented in a sequence that moves from the whole to its
                        parts, from overview to details.
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
                            Balarila at Panitikan | Aralining Panlipunan
                          </Card.Title>
                        </Col>
                      </Row>
                      <Card.Text className="mt-1">
                        are all given in Filipino. Aside from the academic
                        areas, the program includes special subjects like art,
                        music, physical education, practical arts, and religion
                        or moral values education.
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
                        subject caters to the child’s need to learn:{" "}
                        <strong>Oral,</strong>
                        <strong> Reading, Writing, and Grammar.</strong>{" "}
                        Exercises or activities that help satisfy the child’s
                        need for self-expression include oral games, talks,
                        conversations, narration, dramatization, speeches,
                        poetry, public speaking, and intellectual curiosity
                        through interviews. In reading, the children are exposed
                        to classic stories at an early stage to further develop
                        good moral values and socio-cultural awareness. Writing
                        is taught gradually from words, simple phrases,
                        sentences, paragraphs with philosophical conclusions,
                        and later to a whole composition. In Grammar, materials
                        are used to facilitate easier understanding such as
                        Grammar symbols, Noun Family charts, Sentence Pattern
                        Charts, and Sentence Analysis Charts.
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
                        is reinforced by the Stamp Game, Bead Frame, Checker
                        Board, Division Bead Board, Flat Bead Frame, etc.. A set
                        of graduated problem-solving and drill cards accompany
                        each material. These concepts lead to the study of
                        divisibility, fractions, commission, interest, systems
                        of measurement, and the extraction of square and cube
                        roots.
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
            </div>
          
              <Card.Body>
                <div className="curriculum-item">
                  <div className="d-flex align-items-start mb-2">
                    <div className="icon me-2">
                      <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                      </svg>
                    </div>
                    <div>
                      <Card.Title className="course-section-text mb-0">
                        Geometry
                      </Card.Title>
                      <Card.Text className="mt-1">
                        starts with the Basic Geometric ideas of definition,
                        name, construction, and measurement. These lead to the
                        concepts of Similarity, Equivalency, Congruency, the
                        study of the perimeter, Circumference, Area, Surface
                        Area, Pythagorean Theorem, and Volume. Corresponding
                        Geometry materials enable the child to understand fully
                        the concepts.
                      </Card.Text>
                    </div>
                  </div>
                </div>
              </Card.Body>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default GradeSchoolCurriculum;
