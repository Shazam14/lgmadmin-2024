import React from "react";
import "../../../styles/course.css";
import { Container, Card, Col, Row, Table } from "react-bootstrap";

const CASAAdmission = () => {
  return (
    <Container fluid>
      <section className="our-course-section">
        <div className="card-course-box">
          <h2 className="course-section-title">LGMS ADMISSION REQUIREMENTS</h2>
          <Row>
            <Col>
              <Card className="mb-4">
                <Card.Header>New Students Requirements</Card.Header>
                <Card.Body>
                  <Card.Title>A. Procedure</Card.Title>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>
                          1. Fill up the application form and attach the
                          requirements
                        </td>
                      </tr>
                      <tr>
                        <td>2. Arrange for an interview</td>
                      </tr>
                      <tr>
                        <td>3. Have the child undergo assessment</td>
                      </tr>
                      <tr>
                        <td>4. Settle Tuition Fee</td>
                      </tr>
                    </tbody>
                  </Table>

                  <Card.Title>B. Requirements</Card.Title>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>1. 8 - 2.6 yrs. Old Playgroup</td>
                      </tr>
                      <tr>
                        <td>2.6 - 6 yrs. Old CASA</td>
                      </tr>
                      <tr>
                        <td>6 -12 years old Elementary</td>
                      </tr>
                      <tr>
                        <td>13-16 years old High School</td>
                      </tr>
                    </tbody>
                  </Table>

                  <Card.Title>C. Required Documents</Card.Title>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>1. Application Form (duly filled up)</td>
                      </tr>
                      <tr>
                        <td>2. Documents</td>
                      </tr>
                      <tr>
                        <td>a. Original PSA Birth certificate</td>
                      </tr>
                      <tr>
                        <td>b. Baptismal Certificate or its equivalent</td>
                      </tr>
                      <tr>
                        <td>c. Report Card (Form 138) or its equivalent</td>
                      </tr>
                      <tr>
                        <td>d. Transcript Of Records (Form 137)</td>
                      </tr>
                      <tr>
                        <td>e. Recommendation Letter</td>
                      </tr>
                      <tr>
                        <td>f. Certificate of Completion</td>
                      </tr>
                      <tr>
                        <td>g. Certificate of Good Moral Character</td>
                      </tr>
                      <tr>
                        <td>h. Health Form (from LGMS)</td>
                      </tr>
                      <tr>
                        <td>i. Additional Requirements for Alien Students</td>
                      </tr>
                      <tr>
                        <td>
                          j. Additional Requirements for Students with Special
                          Needs
                        </td>
                      </tr>
                      <tr>
                        <td>3. ID Pictures</td>
                      </tr>
                    </tbody>
                  </Table>

                  <Card.Title>D. Enrollment Proper</Card.Title>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>
                          1. All applicants who pass the entrance examination
                          and interviews are required to submit all
                          requirements.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          2. Parents are required to sign a Conforme on
                          Acceptance.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          3. Parents may be required to sign a Conforme on
                          Probation.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          4. All fees indicated in the schedule of payments are
                          settled with the cashier.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          5. All New Parents are required to undergo an
                          orientation.
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="mb-4">
                <Card.Header>Old Students Requirements</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Old Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          1. Reservations: All old students intending to
                          re-enroll for the coming school year are obliged to
                          make their reservation.
                        </td>
                      </tr>
                      <tr>
                        <td>2. Enrollment Proper</td>
                      </tr>
                      <tr>
                        <td>
                          - Fill up the Registration Form, Pick-up Form, Waiver
                          of Liability, and Health Form.
                        </td>
                      </tr>
                      <tr>
                        <td>- Sign a medical and enrollment conforme.</td>
                      </tr>
                      <tr>
                        <td>
                          - All fees indicated in the schedule of payments are
                          settled with the Cashier.
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <Card.Title>Enrollment Schedule</Card.Title>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Casa children may enroll anytime of the year.</td>
                      </tr>
                      <tr>
                        <td>
                          Grade School and High School students may enroll only
                          before the school year begins.
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </Container>
  );
};

export default CASAAdmission;
