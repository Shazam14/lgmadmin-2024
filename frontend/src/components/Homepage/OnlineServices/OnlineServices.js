import React from "react";
import { Container } from "react-bootstrap";
import "../../../styles/homepage.css";

const OnlineServices = () => {
  const items = [
    { text: "Student Portal", icon: <IconComponent1 /> },
    { text: "Family Portal", icon: <IconComponent2 /> },
    { text: "Teacher Portal", icon: <IconComponent3 /> },
  ];

  return (
    <Container fluid>
      <div className="online-services-container">
        <div className="services-header">
          <h1 className="display-6">Our Online Services - coming soon!</h1>
        </div>

        <div className="services-list">
          {items.map((item, index) => (
            <div key={index} className="service-item">
              <button className="button-services">{item.icon}</button>
              <div className="text-homepage">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="horizontal-divider" />
    </Container>
  );
};

const IconComponent1 = () => (
  <svg className="icon" viewBox="0 0 576 512">
    <path d="M144.3 32.04C106.9 31.29 63.7 41.44 18.6 61.29c-11.42 5.026-18.6 16.67-18.6 29.15l0 357.6c0 11.55 11.99 19.55 22.45 14.65c126.3-59.14 219.8 11 223.8 14.01C249.1 478.9 252.5 480 256 480c12.4 0 16-11.38 16-15.98V80.04c0-5.203-2.531-10.08-6.781-13.08C263.3 65.58 216.7 33.35 144.3 32.04zM557.4 61.29c-45.11-19.79-88.48-29.61-125.7-29.26c-72.44 1.312-118.1 33.55-120.9 34.92C306.5 69.96 304 74.83 304 80.04v383.1C304 468.4 307.5 480 320 480c3.484 0 6.938-1.125 9.781-3.328c3.925-3.018 97.44-73.16 223.8-14c10.46 4.896 22.45-3.105 22.45-14.65l.0001-357.6C575.1 77.97 568.8 66.31 557.4 61.29z" />
  </svg>
);

const IconComponent2 = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M6.32 13.01c.96.02 1.85.5 2.45 1.34A3.961 3.961 0 0 0 12 16c1.29 0 2.5-.62 3.23-1.66.6-.84 1.49-1.32 2.45-1.34-.72-1.22-3.6-2-5.68-2-2.07 0-4.96.78-5.68 2.01zM4 13c1.66 0 3-1.34 3-3S5.66 7 4 7s-3 1.34-3 3 1.34 3 3 3zm16 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8-3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"></path>
    <path d="M21 14h-3.27c-.77 0-1.35.45-1.68.92-.04.06-1.36 2.08-4.05 2.08-1.43 0-3.03-.64-4.05-2.08-.39-.55-1-.92-1.68-.92H3c-1.1 0-2 .9-2 2v4h7v-2.26c1.15.8 2.54 1.26 4 1.26s2.85-.46 4-1.26V20h7v-4c0-1.1-.9-2-2-2z"></path>
  </svg>
);

const IconComponent3 = () => (
  <svg className="icon" viewBox="0 0 576 512">
    <path d="M96 96h384v288h64V72C544 50 525.1 32 504 32H72C49.1 32 32 50 32 72V384h64V96zM560 416H416v-48c0-8.838-7.164-16-16-16h-160C231.2 352 224 359.2 224 368V416H16C7.164 416 0 423.2 0 432v32C0 472.8 7.164 480 16 480h544c8.836 0 16-7.164 16-16v-32C576 423.2 568.8 416 560 416z"></path>
  </svg>
);

export default OnlineServices;
