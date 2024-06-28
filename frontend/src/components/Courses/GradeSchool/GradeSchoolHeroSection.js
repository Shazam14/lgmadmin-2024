// GSHeroSection.js
import React, { useState } from "react";
import { Card, Container, Modal, Button, Table } from "react-bootstrap";
import "../../../styles/course.css";
import requirementsData from "../ApplyForm/requirementsData";

const GradeSchoolHeroSection = ({ handleApplyClick, formRef }) => {
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
                Discover Elementary Program
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
            <h2 className="course-section-title">Elementary Class Program</h2>
            <p className="course-section-text">
              The Grade School is for children ages 6-12 years old. This is the
              age when they want to explore the universe through their
              imagination. Thus, the children work with impressionistic charts,
              timelines, classified nomenclature, real specimens of plants,
              animals, and minerals, and manipulative materials such as bead
              bars, puzzled maps, etc. Activities involve research and field
              trips outside the classroom.
            </p>
            <p>
              The Grade School program is divided into two cycles, the first
              cycle for ages 6-9 and the second for ages 9-12. In the first
              cycle, the children are helped to develop a free and inquiring
              mind in all areas of interest. Presentations are usually given in
              small groups or at times individually, as in the Casa. Children
              then work alone, with a teacher, or with peers. In the second
              cycle, the program becomes more structured so that in their last
              year, there is a clear approximation to the requirements of high
              school work. Together with the strengthening of intellectual
              skills, the many varied homeroom experiences help the children
              become more aware of their responsibility for learning as part of
              their emotional, social, and moral growth.
            </p>
          </div>
        </section>
      </Container>
      {/* --modal */} {/* --modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{requirementsData.title}</Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          {requirementsData.sections.map((section, index) => (
            <Card className="mb-4" key={index}>
              <Card.Body>
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
            </Card>
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

export default GradeSchoolHeroSection;
