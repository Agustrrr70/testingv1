import React, { useRef, useState, useEffect } from "react";
import Header, { HEADER_HEIGHT_PX } from "./Header";
import { useParams, useLocation } from "react-router-dom";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { version as pdfjsVersion } from "pdfjs-dist/package.json";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const Ayat = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const surahName = query.get("name") || "Surah";

  // refs & state untuk custom zoom
  const containerRef = useRef(null); // outer container (scroll area)
  const zoomTargetRef = useRef(null); // element yang akan di scale (viewer wrapper)
  const lastTouchDistRef = useRef(null);
  const baseScaleRef = useRef(1); // persistent base scale
  const [scale, setScale] = useState(1);

  // limits
  const MIN_SCALE = 1;
  const MAX_SCALE = 3;
  const SCALE_STEP = 0.25;

  useEffect(() => {
    const container = containerRef.current;
    const zoomEl = zoomTargetRef.current;
    if (!container || !zoomEl) return;

    // TOUCH handlers for pinch
    let ongoingPinch = false;

    const getDistance = (t1, t2) => {
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      return Math.hypot(dx, dy);
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length === 2) {
        ongoingPinch = true;
        lastTouchDistRef.current = getDistance(e.touches[0], e.touches[1]);
        // prevent browser pinch (if any)
        e.preventDefault();
      }
    };

    const onTouchMove = (e) => {
      if (ongoingPinch && e.touches && e.touches.length === 2) {
        const dist = getDistance(e.touches[0], e.touches[1]);
        const last = lastTouchDistRef.current || dist;
        const delta = dist / last;
        const newScale = clamp(
          baseScaleRef.current * delta,
          MIN_SCALE,
          MAX_SCALE
        );
        // terapkan transform
        zoomEl.style.transform = `scale(${newScale})`;
        zoomEl.style.transformOrigin = "center top";
        setScale(newScale);
        // prevent scrolling while pinch
        e.preventDefault();
      }
    };
    // eslint-disable-next-line no-unused-vars
    const onTouchEnd = (e) => {
      if (ongoingPinch) {
        // commit the current scale into baseScaleRef
        baseScaleRef.current = scale;
        lastTouchDistRef.current = null;
        ongoingPinch = false;
      }
    };

    // Double-tap handler (quick zoom/reset)
    let lastTap = 0;
    // eslint-disable-next-line no-unused-vars
    const onSingleDoubleTap = (e) => {
      const now = Date.now();
      if (now - lastTap < 300) {
        // double tap
        const targetScale = scale >= 1.5 ? 1 : 2; // toggle
        baseScaleRef.current = targetScale;
        zoomEl.style.transform = `scale(${targetScale})`;
        setScale(targetScale);
      }
      lastTap = now;
    };

    // Wheel zoom (desktop) - optional
    const onWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
        const newScale = clamp(scale + delta, MIN_SCALE, MAX_SCALE);
        baseScaleRef.current = newScale;
        zoomEl.style.transform = `scale(${newScale})`;
        setScale(newScale);
      }
    };

    // attach
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: false });
    container.addEventListener("touchcancel", onTouchEnd, { passive: false });

    container.addEventListener("click", onSingleDoubleTap);
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);

      container.removeEventListener("click", onSingleDoubleTap);
      container.removeEventListener("wheel", onWheel);
    };
  }, [scale]);

  // tombol toolbar
  const zoomIn = () => {
    const newScale = clamp(
      baseScaleRef.current + SCALE_STEP,
      MIN_SCALE,
      MAX_SCALE
    );
    baseScaleRef.current = newScale;
    if (zoomTargetRef.current) {
      zoomTargetRef.current.style.transform = `scale(${newScale})`;
      zoomTargetRef.current.style.transformOrigin = "center top";
    }
    setScale(newScale);
  };

  const zoomOut = () => {
    const newScale = clamp(
      baseScaleRef.current - SCALE_STEP,
      MIN_SCALE,
      MAX_SCALE
    );
    baseScaleRef.current = newScale;
    if (zoomTargetRef.current) {
      zoomTargetRef.current.style.transform = `scale(${newScale})`;
      zoomTargetRef.current.style.transformOrigin = "center top";
    }
    setScale(newScale);
  };

  const resetZoom = () => {
    baseScaleRef.current = 1;
    if (zoomTargetRef.current) {
      zoomTargetRef.current.style.transform = `scale(1)`;
      zoomTargetRef.current.style.transformOrigin = "center top";
    }
    setScale(1);
  };

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
        background: "#fff",
      }}
    >
      <Header title={surahName} />

      {/* toolbar sederhana untuk zoom */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={zoomOut} aria-label="Zoom out">
          -
        </button>
        <div>Zoom: {scale.toFixed(2)}x</div>
        <button onClick={zoomIn} aria-label="Zoom in">
          +
        </button>
        <button onClick={resetZoom} aria-label="Reset zoom">
          Reset
        </button>
      </div>

      {/* container scrollable — this is where we attach touch handlers */}
      <div
        ref={containerRef}
        className="pdf-zoom-area"
        style={{
          flex: 1,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y", // biarkan geser vertikal, pinch disimulasikan di atas
          position: "relative",
        }}
      >
        {/* pembungkus yang akan di-scale */}
        <div
          ref={zoomTargetRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center top",
            transition: "transform 120ms linear",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: 480 }}>
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
            >
              <Viewer
                fileUrl={`/ayat/${id}.pdf`}
                defaultScale={SpecialZoomLevel.PageWidth}
              />
            </Worker>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ayat;
