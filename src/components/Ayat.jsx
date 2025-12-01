import React from "react";
import Header, { HEADER_HEIGHT_PX } from "./Header";
import { useParams, useLocation } from "react-router-dom";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { version as pdfjsVersion } from "pdfjs-dist/package.json";

const Ayat = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const surahName = query.get("name") || "Surah";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "480px",
        margin: "0 auto",
        paddingTop: HEADER_HEIGHT_PX,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // cegah scroll horizontal
      }}
    >
      <Header title={surahName} />

      <div
        className="pdf-wrapper"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
        >
          <Viewer
            fileUrl={`/ayat/${id}.pdf`}
            defaultScale={SpecialZoomLevel.PageWidth} // auto fit width
          />
        </Worker>
      </div>
    </div>
  );
};

export default Ayat;
