import React, { useState } from "react";
import { Card, Stack, Container } from "react-bootstrap";
import "../../../styles/homepage.css";

const AnnouncementCard = (props) => {
  const [content, setContent] = useState(props.initialContent);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const postedOnDate = new Date().toLocaleDateString();

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          <textarea
            value={content}
            onChange={handleContentChange}
            rows={3}
            className="form-control"
          />
        </Card.Text>
        <Card.Footer>
          <small className="text-muted">Posted on: {postedOnDate}</small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

const Announcement = () => {
  const announcementData = [
    {
      id: 1,
      title: "School Event",
      initialContent:
        "Join us for the annual school event celebrating student achievements.",
    },
    {
      id: 2,
      title: "Card 2 Title",
      initialContent: "This is the initial content of Card 2. You can edit it.",
    },
    {
      id: 3,
      title: "Card 3 Title",
      initialContent: "This is the initial content of Card 3. You can edit it.",
    },
  ];

  const cards = announcementData.map((announcement) => (
    <AnnouncementCard
      key={announcement.id}
      title={announcement.title}
      initialContent={announcement.initialContent}
    />
  ));

  return (
    <Container fluid>
      <div className="announcement-section">
        <h1 className="display-6">//Featured Announcements</h1>
        <Stack direction="vertical" gap={3}>
          {cards}
        </Stack>
        {/* <Button variant="primary" className="more-announcements-button">
        More Announcements
      </Button> */}
      </div>
    </Container>
  );
};

export default Announcement;
