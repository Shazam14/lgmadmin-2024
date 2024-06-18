import React from "react";
import { Modal, Button, Card, Table } from "react-bootstrap";

const AdmissionModal = ({ show, handleClose, requirements }) => {
  if (!requirements || !requirements.sections) {
    return null; // Return null if requirements is undefined
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Admission Requirements</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          <Card.Header>{requirements.title}</Card.Header>
          <Card.Body>
            {requirements.sections.map((section, index) => (
              <div key={index}>
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
              </div>
            ))}
          </Card.Body>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Proceed to Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdmissionModal;
