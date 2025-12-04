import React, { useState } from "react";
import Header, { HEADER_HEIGHT_PX } from "../components/Header";
import { surahList } from "../data/surahList";
import { useNavigate } from "react-router-dom";

const Surah = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const filteredSurah = surahList.filter(
    (s) =>
      s.name.toLowerCase().includes(keyword.toLowerCase()) ||
      s.arab.toLowerCase().includes(keyword.toLowerCase())
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
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Header title="Surah" onSearchChange={setKeyword} />

      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {filteredSurah.map((s) => (
          <li
            key={s.name}
            style={{
              padding: "12px 16px",
              marginBottom: "10px",
              borderRadius: "12px",
              background: "#ffffff",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/Ayat/${s.name}?name=${encodeURIComponent(s.name)}&type=surah`)
            }
          >
            <div
              style={{
                fontSize: "15px",
                fontWeight: 600,
                marginBottom: "2px",
                color: "#222",
              }}
            >
              {s.name}
            </div>

            <div style={{ fontSize: "12px", color: "#666" }}>
              {s.arab}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Surah;
