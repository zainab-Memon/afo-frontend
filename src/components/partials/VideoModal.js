import React from "react";

const VideoModal = ({ children }) => {
  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "800px",
    height: "50%",
    maxHeight: "900px",
    backgroundColor: "#fff",
    borderRadius: "0",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    outline: "none",
    border: "none",
  };

  const contentStyles = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
  };

  return (
    <div style={modalStyles}>
      <div style={contentStyles}>{children}</div>
    </div>
  );
};

export default VideoModal;
