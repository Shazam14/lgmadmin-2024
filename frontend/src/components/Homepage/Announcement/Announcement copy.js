import React, { useState } from "react";
import "../../../styles/homepage.css";
const Card = (props) => {
  const [content, setContent] = useState(props.initialContent);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const postedOnDate = new Date().toLocaleDateString();

  return (
    <div className="announcement-card">
      <h3 className="announcement-card-title">{props.title}</h3>
      <textarea
        value={content}
        onChange={handleContentChange}
        rows={3}
        className="announcement-card-content-input"
      />
      <div className="posted-on">Posted on: {postedOnDate}</div>
    </div>
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
    <Card
      key={announcement.id}
      title={announcement.title}
      initialContent={announcement.initialContent}
    />
  ));

  return (
    <div className="announcement-section">
      <h1 className="display-6">Display 6</h1>
      <h2 className="announcement-heading">Featured Announcements</h2>
      <div className="announcement-container">
        {cards}
        <button className="more-announcements-button">
          More Announcements
        </button>
      </div>
    </div>
  );
};

export default Announcement;
