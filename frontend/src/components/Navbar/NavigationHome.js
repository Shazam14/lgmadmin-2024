import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Modal,
  Button,
} from "react-bootstrap";
import LGMSChatbot from "../LGMSChatbot/LGMSChatbot";

const NavigationHome = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const handleShowChatbot = () => setShowChatbot(true);
  const handleCloseChatbot = () => setShowChatbot(false);

  return (
    <Container>
      <Navbar
        fixed="top"
        expand="lg"
        style={{ backgroundColor: "#317B41", padding: "10px" }}
      >
        <Nav.Link className="text-white" as={Link} to="/">
          Home
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="#"
              onClick={handleShowChatbot}
              className="text-white"
            >
              Chatbot
            </Nav.Link>
            <NavDropdown title="Programs" id="courses-dropdown">
              <NavDropdown.Item as={Link} to="/courses/casa">
                CASA
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/grade-school">
                Elementary School
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/highschool">
                Junior High School
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/lgmsteach">
                LGMS T.E.A.C.H
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/playgroup">
                Playgroup
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="text-white" as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link className="text-white" as={Link} to="/apply-form">
              Apply Online
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown title="LGMS Portal" id="portal-dropdown">
              <NavDropdown.Item as={Link} to="/portal/student">
                Student
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/portal/teacher">
                Teacher
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal
        className="custom-modal"
        show={showChatbot}
        onHide={handleCloseChatbot}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>LGMS Chatbot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LGMSChatbot />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default NavigationHome;
