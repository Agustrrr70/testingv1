import React from "react";

const HEADER_HEIGHT = 50;

const Header = ({ title, onSearchChange }) => {
  return (
    <header
      style={{
        width: "100%",
        height: `${HEADER_HEIGHT}px`,
        backgroundColor: "#244502",
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
      <button
        onClick={() => window.history.back()}
        style={{
          fontSize: "22px",
          fontWeight: "500",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#ffffff",
          position: "relative",
          top: "-1px",
        }}
      >
        ←
      </button>

      {/* Title */}
      <div
        style={{
          marginLeft: "8px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#ffffff",
          flex: 1,
        }}
      >
        {title}
      </div>

      {/* Search bar (lebih kanan + lebih proporsional) */}
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
            marginRight: "5px", // ⬅ GESER KE KIRI
            transform: "translateX(-4px)", // ⬅ sedikit rapikan
          }}
        />
      ) : (
        <div style={{ width: "110px" }} />
      )}
    </header>
  );
};

export default Header;
// eslint-disable-next-line react-refresh/only-export-components
export const HEADER_HEIGHT_PX = HEADER_HEIGHT;
