import React from "react";

const Footer: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
      }}
    >
      <span style={{ marginRight: "5px", fontSize: "1.2rem", fontWeight: "bold" }}>
        {"<"}
        {"/"}
        {">"}
      </span>
      <p style={{ fontWeight: "bold" }}>
        Developed by
        <a href="https://github.com/gjha133" target="_blank" rel="noopener noreferrer" style={{ padding: "5px" }}>
          Gautam Jha
        </a>
      </p>
    </div>
  );
};

export default Footer;
