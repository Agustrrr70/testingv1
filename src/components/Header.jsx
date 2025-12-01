import React from "react";

const HEADER_HEIGHT = 50;

const Header = ({ title, onSearchChange }) => {
  return (
    <header
      style={{
        width: "100%",
        maxWidth: "420px",
        height: `${HEADER_HEIGHT}px`,
        backgroundColor: "#05420bff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        padding: "0 12px",
      }}
    >
      {/* Tombol Back */}
      <button
        onClick={() => window.history.back()}
        style={{
          fontSize: "20px",       // ⬅ dibuat lebih besar
          fontWeight: "900",      // ⬅ dipertebal
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#ffffff",
        }}
      >
        ←
      </button>

      {/* Title kiri dekat tombol back */}
      <div
        style={{
          marginLeft: "8px",      // ⬅ jarak kecil dari tombol back
          fontSize: "20px",
          fontWeight: "bold",
          color: "#ffffff",
          flex: 1,                // ⬅ supaya search tetap di kanan
        }}
      >
        {title}
      </div>

      {/* Search bar */}
      {onSearchChange ? (
        <input
          type="text"
          placeholder="Cari..."
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "18px",
            border: "none",
            fontSize: "14px",
            outline: "none",
            width: "120px",
            background: "#ffffff",
            color: "#000",
          }}
        />
      ) : (
        <div style={{ width: "120px" }} />
      )}
    </header>
  );
};

export default Header;
// eslint-disable-next-line react-refresh/only-export-components
export const HEADER_HEIGHT_PX = HEADER_HEIGHT;
