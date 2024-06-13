import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const Confirm = ({ formData }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>Confirm Your Information</h2>
            <Table striped bordered hover>
              <tbody>
                {Object.entries(formData.parent).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
                {Object.entries(formData.applicant).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Confirm;
