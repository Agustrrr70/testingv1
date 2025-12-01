import React, { useState } from "react";
import Header from "./Header";
import { surahList } from "../data/surahList";

const Surah = () => {
  const [query, setQuery] = useState("");

  const filteredSurah = surahList.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.meaning.toLowerCase().includes(query.toLowerCase()) ||
      s.number.toString().includes(query)
  );

  return (
    <div style={{ padding: "50px" }}>
      <Header title="Surah" />
      <h2>Daftar Surah</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Cari surah..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 15px",
          borderRadius: "25px",
          border: "1px solid #ccc",
          margin: "10px 0 20px",
          fontSize: "15px",
          outline: "none",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredSurah.map((s) => (
          <li
            key={s.number}
            style={{
              padding: "10px 15px",
              marginBottom: "8px",
              borderRadius: "8px",
              background: "#f4f4f4",
            }}
          >
            <strong>
              {s.number}. {s.name}
            </strong>
            <div style={{ fontSize: "14px", color: "#555" }}>{s.meaning}</div>
          </li>
        ))}

        {filteredSurah.length === 0 && (
          <p style={{ color: "#777", textAlign: "center", marginTop: "20px" }}>
            Surah tidak ditemukan…
          </p>
        )}
      </ul>
    </div>
  );
};

export default Surah;
