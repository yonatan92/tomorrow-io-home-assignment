import React from "react";

const Spinner: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 80,
    }}
  >
    <div
      style={{
        border: "4px solid #f3f4f6",
        borderTop: "4px solid #61dafb",
        borderRadius: "50%",
        width: 36,
        height: 36,
        animation: "spin 1s linear infinite",
      }}
    />
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Spinner;
