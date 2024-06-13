import React, { useEffect, useState } from "react";
import { Card, Stack, Container } from "react-bootstrap";
import "../../../styles/homepage.css";
import apiClient from "../../../services/apiClient";
import api from "../../../services/api";

const AnnouncementCard = ({ announcement }) => {
  const postedOnDate = new Date(announcement.created_at).toLocaleDateString();

  return (
    <Card>
      <Card.Body>
        <Card.Title>{announcement.title}</Card.Title>
        <Card.Text>{announcement.content}</Card.Text>
        <Card.Footer>
          <small className="text-muted">Posted on: {postedOnDate}</small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await apiClient.get("announcements/");
        setAnnouncements(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
        setError("Failed to fetch announcements. Please try again later.");
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <Container fluid>
      <div className="announcement-section">
        <h1 className="display-6">Featured Announcements</h1>
        {loading ? (
          <p>Loading announcements...</p>
        ) : error ? (
          <p>{error}</p>
        ) : announcements && announcements.length > 0 ? (
          <Stack direction="vertical" gap={3}>
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </Stack>
        ) : (
          <p>No announcements found.</p>
        )}
      </div>
    </Container>
  );
};

export default Announcement;