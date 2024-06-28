// StudentDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentByStudentId } from "../../../../services/studentApi";
import { useStudent } from "../../../../contexts/StudentContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import "../../../../styles/portal/studentdetail.css";

const StudentDetail = () => {
  const { studentId } = useParams();
  const { student, updateStudent } = useStudent();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!student) {
          console.log("Fetching student with ID:", studentId);
          const data = await fetchStudentByStudentId(studentId);
          updateStudent(data);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId, student]);

  return (
    <Container>
      <Row>
        <Col>
          {student ? (
            <>
              <h1>Student Information</h1>
              <hr />
              <Row>
                <Col md={8}>
                  <Form>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name:</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={student.first_name}
                      />
                    </Form.Group>
                    <Form.Group controlId="middleName">
                      <Form.Label>Middle Name:</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={student.middle_name}
                      />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name:</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={student.last_name}
                      />
                    </Form.Group>
                    <Form.Group controlId="gender">
                      <Row>
                        <Col>
                          <Form.Label>Gender:</Form.Label>
                          <Form.Control
                            type="text"
                            readOnly
                            value={student.gender}
                          />
                        </Col>
                        <Col>
                          <Form.Label>Age:</Form.Label>
                          <Form.Control
                            type="text"
                            readOnly
                            value={student.age}
                          />
                        </Col>
                        <Col>
                          <Form.Label>Birthday:</Form.Label>
                          <Form.Control
                            type="text"
                            readOnly
                            value={student.birthday}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>Email Address:</Form.Label>
                          <Form.Control
                            type="text"
                            readOnly
                            value={student.email}
                          />
                        </Col>
                        <Col>
                          <Form.Label>Phone Number:</Form.Label>
                          <Form.Control
                            type="tel"
                            readOnly
                            value={student.phone_number}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Col>
                      <Form.Group controlId="streetAddress">
                        <Form.Label>Street Address:</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={student.address}
                        />
                      </Form.Group>
                    </Col>
                    <Row>
                      <Col>
                        <Form.Group controlId="city">
                          <Form.Label>City:</Form.Label>
                          <Form.Control
                            type="text"
                            readOnly
                            value={student.city}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="state">
                          <Form.Label>State:</Form.Label>
                          <Form.Control
                            type="text"
                            readOnly
                            value={student.state}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col>
                  <div className="student-image-container">
                    {student.image ? (
                      <Image src={student.image} className="student-image" />
                    ) : (
                      <div className="student-placeholder" />
                    )}
                  </div>
                  <Form>
                    <Form.Group controlId="studentId">
                      <Form.Label>Student ID:</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={student.student_id}
                      />
                    </Form.Group>

                    <Form.Group controlId="program">
                      <Form.Label>Program:</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={student.program}
                      />
                    </Form.Group>
                    <FormGroup controlId="grade">
                      <FormLabel>Grade:</FormLabel>
                      <Form.Control
                        type="text"
                        readOnly
                        value={student.grade}
                      />
                    </FormGroup>
                    <Form.Group controlId="tuitionNotes">
                      <Form.Label>Tuition Notes:</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={student.tuition_notes}
                      />
                    </Form.Group>
                    <Form.Group controlId="tuitionStatus">
                      <Form.Label>Tuition Status:</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={student.tuition_status}
                      />
                    </Form.Group>
                    <Form.Group controlId="accountStatus">
                      <Form.Label>Account Status:</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={student.account_status}
                      />
                    </Form.Group>
                  </Form>
                  <Row>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className="mr-3 reset-button"
                      >
                        Reset
                      </Button>
                      <Button
                        variant="success"
                        style={{
                          backgroundColor: "#05d114",
                          marginLeft: "10px",
                        }}
                        className="update-button"
                      >
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          ) : (
            <p>Loading student details...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDetail;
