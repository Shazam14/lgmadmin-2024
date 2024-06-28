import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/about.css";
import schoolImage from "../../assets/images/about_img/schoolbldg.jpeg";

const WhoWeAre = () => {
  return (
    <Card className="who-we-are-card-container">
      <Card.Img
        variant="top"
        src={schoolImage}
        alt="School Building"
        style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
      />
      <Card.Body className="who-we-are-content">
        <Card.Title as="h3" className="who-we-are-header">Who we are</Card.Title>
        <Card.Text className="who-we-are-text">
          Learning Garden Montessori School (LGMS) is a non-stock, non-profit,
          non-sectarian family-owned educational institution, that started in January of
          2000. The school started with a small group of children on a rented
          bungalow house in Aguirre where our small building is situated.
        </Card.Text>
        <Card.Text>
          The first phase of Elementary, grades 1 to 3, started in 2004 upon the
          consistent request of our Casa graduating parents. The second phase of
          Elementary, grades 4 to 6 was opened the following year to accommodate
          transfer students.
        </Card.Text>
        <Card.Text>
          LGMS was duly recognized by the Department of Education in 2003 for our
          Casa course, in 2006 for the complete elementary course, in 2011 for our
          SPED Program, and in 2013 for the complete Secondary High School.
        </Card.Text>
        <Card.Text>
          As a continuous service for the students and parents, LGMS purchased the
          house and lot, demolished the bungalow house, and rebuilt a new building in
          2005 to cater to the growing population. From then on, yearly renovations
          and building improvements are being done.
        </Card.Text>
        <Card.Text>
          Over the years, LGMS has been working towards attaining the goal of
          Montessori Education: the development of its students to excel not only in
          academics and values but likewise the development of the students who
          are lifelong learners, good citizens of our country, and will be movers of the
          future.
        </Card.Text>
        <Card.Text>
          Thus far, it has produced graduates who excel academically in Montessori
          environments and Traditional big schools.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WhoWeAre;

