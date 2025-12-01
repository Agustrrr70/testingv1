import React from "react";
import Header, { HEADER_HEIGHT_PX } from "./Header";
import { useParams, useLocation } from "react-router-dom";

const Ayat = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const surahName = query.get("name") || "Surah";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        margin: "0 auto",
        paddingTop: HEADER_HEIGHT_PX,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header title={surahName} />

      <iframe
        src={`/ayat/${id}.pdf`}
        style={{
          width: "100%",
          height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
          border: "none",
        }}
      />
    </div>
  );
};

export default Ayat;
