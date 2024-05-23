import React from "react";
import { Container } from "react-bootstrap";
import Icons from "./Icons";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <Container fluid>
      <Icons />
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2024 Learning Garden Montessori
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="/terms-of-service">
              Terms of Service
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="/privacy-policy">
              Privacy Policy
            </a>
          </li>

          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://twitter.com/your-twitter-handle"
            >
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#twitter" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://instagram.com/your-instagram-handle"
            >
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#instagram" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://facebook.com/your-facebook-page"
            >
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#facebook" />
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </Container>
  );
};

export default Footer;
