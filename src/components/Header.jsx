import React from "react";

const HEADER_HEIGHT = 50;

const Header = ({ title }) => {
  return (
    <header
      style={{
        width: "100%",
        height: `${HEADER_HEIGHT}px`,
        backgroundColor: "#05420bff",
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
        color: "#ffffff", // warna teks judul jadi putih
      }}
    >
      {/* Tombol Back */}
      <button
        onClick={() => window.history.back()}
        style={{
          position: "absolute",
          left: "12px",
          fontSize: "18px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          color: "#ffffff", // tombol back juga putih agar serasi
        }}
      >
        ←
      </button>

      {/* Title */}
      {title}
    </header>
  );
};

export default Header;
// eslint-disable-next-line react-refresh/only-export-components
export const HEADER_HEIGHT_PX = HEADER_HEIGHT;
