// GSHeroSection.js
import React, { useState } from "react";
import "../../../styles/course.css";
import { Card, Container, Modal, Button, Table } from "react-bootstrap";
import requirementsData from "../ApplyForm/requirementsData";

const SPEDHeroSection = ({ handleApplyClick, formRef }) => {
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
                Discover LGMS T.E.A.C.H. Program
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
            <h2 className="course-section-title">LGMS’ T.E.A.C.H. Program</h2>
            <p className="course-section-text">
              Since LGMS started, the school began receiving inquiries from
              parents of children with ADD/ADHD and other developmental delays.
              Surprisingly, Therapy Centers and other schools with Special
              Education recommend LGMS as one of the best new environment for
              their clients/students to further develop their social and coping
              skills. With great faith in the Montessori Curriculum and Method,
              these children were able to progress in terms of their social and
              copings skills. This we have proven for the past – years. The main
              objective was achieved. However, as an educational institution
              with a mission of developing the child to his fullest
              potentials…LGMS answered these children’s needs by providing them
              a better and special program. It was then last school year
              2009-2010 when LGMS launched T.E.A.C.H. Program that would best
              suit the needs of children with different exceptionalities.
            </p>
            <p>
              <strong>LGMS’ T.E.A.C.H. Program</strong> is committed to help
              children with special needs by providing individualized
              educational plan, a well- prepared environment, teaching
              procedures, and other interventions driven by love and compassion
              for the child to be life-long learners and achieve greatest
              possible self-sufficiency and success in school and community. It
              envisions growth of our services to Pre-vocational and Vocational
              Courses to be able to give continuous aide to our students. We
              intend to be one of the leading SPED Schools which practices
              latest trends in teaching and other new interventions effective to
              our students. As a Montessori School, we would like to be advocate
              of the richness of Dr. Maria Montessori’s Curriculum and the
              effectiveness of her method that could address the needs of
              children with different exceptionalities. We believe in the
              philosophy of Dr. Montessori that the child is born with human
              potentials. We believe that in order to actualize these
              potentials, the educational system must provide a prepared
              environment where children are free to respond to their natural
              drive to work and learn. The adults and the environment should,
              likewise, encourage the children’s inherent love of learning by
              giving them opportunities to engage in spontaneous, meaningful
              activities.
            </p>
            <p>
              We concur with the Declaration of Human Rights which states all
              human beings without distinction of any kind have equal and
              unalienable rights to human dignity and freedom. Further,
              individuals with any disability whether mild or profound have the
              same basic rights as any other citizen in society. And so we deem
              that children with exceptionalities need the same and even more
              love and compassion. Our goal is to meet the specific needs of our
              students for them to achieve as much success and independence as
              they can in daily living, personal-social, school, community and
              work setting. We adhere to the Policies and Guidelines in Special
              Education (Revised 1997) Article 1 Section 5 stating that the
              ultimate goal of special education shall be the integration or
              mainstreaming of learners with special needs into the regular
              school system and eventually in the community
            </p>
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
export default SPEDHeroSection;
