import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import BotpressChat from "../Botpress/BotpressChat";
const NavigationHome = () => {
  return (
    <Navbar
      fixed="top"
      bg="light"
      expand="lg"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/chatbot" style={{ color: "#286e34" }}>
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
                High School
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/lgmsteach">
                LGMS T.E.A.C.H
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/courses/playgroup">
                Playgroup
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/apply-form">
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
      </Container>
    </Navbar>
  );
};

export default NavigationHome;
