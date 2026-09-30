import React, { useState } from "react";
import ChatSection from "../components/ChatSection";
import { Popup } from "devextreme-react/popup";
import "devextreme/dist/css/dx.light.css";
import ChatImage from "../assets/chat.png";
import group from "../assets/image.png";
import close from "../assets/close.png";


function Chat({ groupId, ConversationId }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {/* Floating Button */}
      {!isChatOpen && (
        <div
          className="floating-button"
          style={{
            position: "fixed",
            bottom: "22px",
            right: "42px",
            width: "60px",
            height: "60px",
            background: "#fff6f6",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            animation: "pulse-animation 3s ease-in-out infinite",
            transition: "transform 0.4s",
          }}
          onClick={toggleChat}
        >
          <img
            src={group}
            alt="Chat Icon"
            style={{ width: "55px", height: "auto" }}
          />
        </div>
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <Popup
          visible={isChatOpen}
          onHiding={toggleChat}
          dragEnabled={true}
          showCloseButton={false}
          width={390}
          height="89%"
          position={{
            my: "right bottom", // Align the popup's right-bottom corner
            at: "right bottom", // Align to the window's right-bottom corner
            of: window, // Target the window for alignment
            offset: "-16 -70", // Offset the popup slightly inward
          }}
          titleRender={() => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#f0f0f0", // Set header background color
                width: "100%", // Ensure the header spans the full width
                boxSizing: "border-box", // Prevent overflow caused by padding
              }}
            >
              {/* Chat Icon */}
              <img
                src={ChatImage}
                alt="Chat Icon"
                style={{ width: "100px", height: "auto" }}
              />

              {/* Close Icon */}
              <button
                onClick={toggleChat}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  src={close} // Replace with your actual close icon image path
                  alt="Close"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </div>
          )}
          contentRender={() => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Chat Body Section */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  backgroundColor: "white",
                }}
              >
                <ChatSection groupId={"136"} ConversationId={""} />
              </div>
            </div>
          )}
        />
      )}

      {/* Animation for the Floating Button */}
      <style>
        {`
          @keyframes pulse-animation {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default Chat;
