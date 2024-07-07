import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const Confirm = ({ formData }) => {
  const formatKey = (key) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const renderTable = (data, title) => (
    <Table striped bordered hover className="mb-4">
      <thead>
        <tr>
          <th colSpan="2" className="bg-primary text-white">{title}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td><strong>{formatKey(key)}</strong></td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="confirm-information">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mb-4">Confirm Your Information</h2>
            {renderTable(formData.parent, "Parent Information")}
            {renderTable(formData.applicant, "Applicant Information")}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Confirm;