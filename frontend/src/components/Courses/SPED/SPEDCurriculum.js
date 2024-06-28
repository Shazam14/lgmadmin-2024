import React from "react";
import "../../../styles/course.css";
import { Container, Card, Table } from "react-bootstrap";

const SPEDCurriculum = () => {
  return (
    <Container fluid>
      <section className="our-course-section">
        <div className="card-course-box">
          <Card.Header>
            <h2 className="course-section-title">Instructional Programs</h2>
          </Card.Header>
          <Card.Body>
            <Table bordered>
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>FULL T.E.A.C.H. Program</td>
                  <td>
                    Students receive special education and related services
                    outside the regular classroom for 61% to 100% of the school
                    day. The student receives a one-on-one or small group class
                    to fully concentrate on the areas that need much attention.
                    This is mostly recommended for students who have difficulty
                    working in a group or class setting.
                  </td>
                </tr>
                <tr>
                  <td>SPED Support</td>
                  <td>
                    Students receive special education and related services
                    outside the regular classroom for at least 21% but no more
                    than 60% of the school day. The student is usually pulled
                    out of the class to attend special classes on subject area/s
                    that are his difficulties.
                  </td>
                </tr>
                <tr>
                  <td>Partial Mainstreaming</td>
                  <td>
                    Students receive individualized instruction under the SPED
                    teacher with socialization with the regular class on minor
                    subjects. This program is given to students who have greatly
                    improved their social skills and have consistently shown
                    progress in their academics. However, the students may still
                    show difficulties in some areas which are addressed in their
                    sessions with the special education teacher.
                  </td>
                </tr>
                <tr>
                  <td>Full Mainstreaming</td>
                  <td>
                    Students attend the regular classroom and are constantly
                    monitored by the SPED team for further assessment.
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </div>
      </section>
    </Container>
  );
};

export default SPEDCurriculum;
