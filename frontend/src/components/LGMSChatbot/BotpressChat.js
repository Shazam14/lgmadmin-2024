import React, { useEffect } from "react";

const BotpressChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    script.async = true;
    script.onload = () => {
      window.botpressWebChat.init({
        hostUrl: "http://localhost:3003", // Make sure this is accessible from your environment
        botId: "your-bot-id",
        botName: "Your Bot Name",
        // Additional configurations
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <div id="bp-web-widget" />
    </div>
  );
};

export default BotpressChat;
