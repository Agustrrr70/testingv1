import React, { useState } from "react";
import Header, { HEADER_HEIGHT_PX } from "./Header";
import { surahList } from "../data/surahList";

const Surah = () => {
  const [keyword, setKeyword] = useState("");

  const filteredSurah = surahList.filter(
    (s) =>
      s.name.toLowerCase().includes(keyword.toLowerCase()) ||
      s.meaning.toLowerCase().includes(keyword.toLowerCase()) ||
      s.number.toString().includes(keyword)
  );

  return (
    <div
      className="app-container"
      style={{
        width: "100%",
        maxWidth: "420px",
        margin: "0 auto",
        paddingTop: HEADER_HEIGHT_PX,
        height: "100vh",
        overflowY: "auto", // ⬅ HALAMAN INI BOLEH SCROLL
        overflowX: "hidden",
      }}
    >
      <Header title="Surah" onSearchChange={setKeyword} />

      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {filteredSurah.map((s) => (
          <li
            key={s.number}
            style={{
              padding: "12px 16px",
              marginBottom: "10px",
              borderRadius: "12px",
              background: "#ffffff",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)";
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "4px",
                color: "#222",
              }}
            >
              {s.number}. {s.name}
            </div>

            <div
              style={{
                fontSize: "10px",
                color: "#666",
              }}
            >
              {s.meaning}
            </div>
          </li>
        ))}

        {filteredSurah.length === 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
              color: "#777",
              fontSize: "15px",
            }}
          >
            Surah tidak ditemukan...
          </p>
        )}
      </ul>
    </div>
  );
};

export default Surah;
