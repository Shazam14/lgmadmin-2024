import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const NavigationHome = () => {
  return (
    <Container>
      <Navbar
        fixed="top"
        bg="light"
        expand="lg"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/chatbot" style={{ color: "#286e34" }}>
              Chatbot
            </Nav.Link>
            <NavDropdown title="Courses" id="courses-dropdown">
              <NavDropdown.Item as={Link} to="/courses/casa">
                CASA
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/grade-school">
                Grade School
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/highschool">
                High School
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/sped">
                SPED
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/homestudy">
                HomeStudy
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about">
              About
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
    </Container>
  );
};

export default NavigationHome;
