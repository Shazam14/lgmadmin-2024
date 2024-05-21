import React, { useState } from "react";
import "../../../styles/homepage.css";

const Card = (props) => {
  const [content, setContent] = useState(props.initialContent);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const postedOnDate = new Date().toLocaleDateString();

  return (
    <div className="card">
      <h3 className="card-title">{props.title}</h3>
      <textarea
        value={content}
        onChange={handleContentChange}
        rows={3}
        className="card-content-input"
        readOnly={!props.isAdmin}
      />
      <p className="card-content">{content}</p>
      <div className="posted-on">Posted on: {postedOnDate}</div>
    </div>
  );
};

export default Card;
