import React, { useRef, useState, useEffect } from "react";
import Header, { HEADER_HEIGHT_PX } from "./Header";
import { useParams, useLocation } from "react-router-dom";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { version as pdfjsVersion } from "pdfjs-dist/package.json";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const Ayat = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const surahName = query.get("name") || "Surah";

  const containerRef = useRef(null);
  const zoomTargetRef = useRef(null);
  const contentRef = useRef(null); // <-- tambahkan ref ini

  const [scale, setScale] = useState(1);
  const baseScaleRef = useRef(1);

  const pointersRef = useRef(new Map());
  const initialPinchDistRef = useRef(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 3;
  const SCALE_STEP = 0.25;

  // ---------------- Hitung midpoint dan distance ----------------
  const getMidpoint = (p1, p2) => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  });
  const getDistance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

  // ---------------- Konversi client point ke content coords ----------------
  const clientPointToContent = (container, clientPoint, currentScale) => {
    const rect = container.getBoundingClientRect();
    return {
      x: (container.scrollLeft + (clientPoint.x - rect.left)) / currentScale,
      y: (container.scrollTop + (clientPoint.y - rect.top)) / currentScale,
    };
  };

  useEffect(() => {
    const container = containerRef.current;
    const target = zoomTargetRef.current;
    if (!container || !target) return;

    container.style.touchAction = "none";

    const onPointerDown = (ev) => {
      container.setPointerCapture(ev.pointerId);
      pointersRef.current.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });

      if (pointersRef.current.size === 2) {
        const [p1, p2] = [...pointersRef.current.values()];
        initialPinchDistRef.current = getDistance(p1, p2);
      }
    };

    const onPointerMove = (ev) => {
      if (!pointersRef.current.has(ev.pointerId)) return;

      const entry = pointersRef.current.get(ev.pointerId);
      entry.x = ev.clientX;
      entry.y = ev.clientY;

      const pointers = [...pointersRef.current.values()];

      // ---------- PAN ----------
      if (pointers.length === 1) {
        const p = pointers[0];
        const prevX = p.prevX ?? p.x;
        const prevY = p.prevY ?? p.y;

        const dx = p.x - prevX;
        const dy = p.y - prevY;

        container.scrollLeft -= dx;
        container.scrollTop -= dy;

        p.prevX = p.x;
        p.prevY = p.y;
        return;
      }

      // ---------- PINCH ZOOM ----------
      if (pointers.length === 2) {
        const [p1, p2] = pointers;
        const dist = getDistance(p1, p2);
        const startDist = initialPinchDistRef.current || dist;
        const ratio = dist / startDist;

        let newScale = clamp(baseScaleRef.current * ratio, MIN_SCALE, MAX_SCALE);

        const midpoint = getMidpoint(p1, p2);

        const contentCoord = clientPointToContent(container, midpoint, baseScaleRef.current);

        target.style.transformOrigin = "0 0";
        target.style.transform = `scale(${newScale})`;
        setScale(newScale);

        const rect = container.getBoundingClientRect();
        const clientOffsetX = midpoint.x - rect.left;
        const clientOffsetY = midpoint.y - rect.top;

        container.scrollLeft = contentCoord.x * newScale - clientOffsetX;
        container.scrollTop = contentCoord.y * newScale - clientOffsetY;
      }
    };

    const onPointerUp = (ev) => {
      pointersRef.current.delete(ev.pointerId);

      for (const p of pointersRef.current.values()) {
        delete p.prevX;
        delete p.prevY;
      }

      if (pointersRef.current.size < 2) {
        baseScaleRef.current = scale;
        initialPinchDistRef.current = null;
      }

      try {
        container.releasePointerCapture(ev.pointerId);
      // eslint-disable-next-line no-unused-vars, no-empty
      } catch (e) {}
    };

    const onWheel = (ev) => {
      if (!ev.ctrlKey) return;
      ev.preventDefault();

      const delta = ev.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
      const newScale = clamp(baseScaleRef.current + delta, MIN_SCALE, MAX_SCALE);

      const rect = container.getBoundingClientRect();
      const clientPoint = { x: ev.clientX, y: ev.clientY };
      const contentCoord = clientPointToContent(container, clientPoint, baseScaleRef.current);

      target.style.transformOrigin = "0 0";
      target.style.transform = `scale(${newScale})`;
      setScale(newScale);

      const clientOffsetX = ev.clientX - rect.left;
      const clientOffsetY = ev.clientY - rect.top;

      container.scrollLeft = contentCoord.x * newScale - clientOffsetX;
      container.scrollTop = contentCoord.y * newScale - clientOffsetY;

      baseScaleRef.current = newScale;
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("wheel", onWheel);
    };
  }, [scale]);

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

      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflow: "auto",
          touchAction: "none",
          WebkitOverflowScrolling: "touch",
          position: "relative",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 90px)",
        }}
      >
        <div
          ref={zoomTargetRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          <div
            ref={contentRef}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
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
