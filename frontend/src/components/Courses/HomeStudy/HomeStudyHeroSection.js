// GSHeroSection.js
import React, { useState } from "react";
import "../../../styles/course.css";
import genericImage from "../../../assets/images/courses_img/lgms_apply_header.jpg";
import { Card, Container, Modal, Button, Table } from "react-bootstrap";
import requirementsData from "../ApplyForm/requirementsData";

const HomeStudyHeroSection = ({ handleApplyClick, formRef }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <Container fluid className="py-4">
        <section className="course-hero-section">
          <div className="course-image-container">
            <div className="image-wrapper">
              <img src="../" alt="Course" className="course-image" />
            </div>
            <div className="text-container">
              <h1 className="course-discover-text">
                Discover Playgroup Program
              </h1>
              <p className="course-join-us-text">
                Join us to explore unique learning opportunities!
              </p>
            </div>
          </div>
          <div className="course-card">
            <div className="info-with-divider">
              <div className="text-group">
                <span className="text-course">Latest Updates</span>
                <span className="text-course-small">Ongoing Enrollment</span>
              </div>
              <div className="divider-vertical"></div>
              <div className="text-group">
                <span className="text-course">Enrollment starting at</span>
                <span className="text-course-small">Feb 1, 2024</span>
              </div>
              <div className="divider-vertical"></div>
              <div className="text-group">
                <span className="text-course">Until</span>
                <span className="text-course-small">Ongoing</span>
              </div>
              <div className="divider-vertical"></div>
              <div className="text-group">
                <span className="text-course">For School Year</span>
                <span className="text-course-small">2024 - 2025</span>
              </div>
              <div>
                <button onClick={handleOpenModal} className="apply-button">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="our-course-program">
          <div className="card-course-box">
            <h2 className="course-section-title">
              Our Playgroup Class Program
            </h2>
            <p className="course-section-text">1.8 to 2.6 years old</p>
          </div>
        </section>
      </Container>
      {/* --modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{requirementsData.title}</Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          {requirementsData.sections.map((section, index) => (
            
              <Card.Body key={index}>
                <Card.Title>{section.title}</Card.Title>
                <Table striped bordered hover>
                  <tbody>
                    {section.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleApplyClick(formRef);
              handleCloseModal();
            }}
          >
            Proceed to Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomeStudyHeroSection;
