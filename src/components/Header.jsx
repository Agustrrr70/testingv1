import React from "react";

const HEADER_HEIGHT = 50;

const Header = ({ title }) => {
  return (
    <header
      style={{
        width: "100%",
        height: `${HEADER_HEIGHT}px`,
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      {title}
    </header>
  );
};

export default Header;
// eslint-disable-next-line react-refresh/only-export-components
export const HEADER_HEIGHT_PX = HEADER_HEIGHT;
