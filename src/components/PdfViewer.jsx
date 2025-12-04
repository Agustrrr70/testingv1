/* eslint-disable no-empty */
import React, { useRef, useEffect, useState } from "react";
import Header, { HEADER_HEIGHT_PX } from "./Header";
import { useParams, useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { version as pdfjsVersion } from "pdfjs-dist/package.json";


const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const PdfViewer = () => {
  const { id } = useParams();
  const [renderScale, setRenderScale] = useState(1);

  const query = new URLSearchParams(useLocation().search);
  const surahName = query.get("name") || "Surah";

  const containerRef = useRef(null);
  const zoomTargetRef = useRef(null);
  const contentRef = useRef(null);

  // track current/base scale
  const baseScaleRef = useRef(1);

  // helpers for pointer tracking
  const pointersRef = useRef(new Map());
  const initialPinchDistRef = useRef(null);

  // store pinch midpoint client coord and content coord (computed once at pinch-start)
  const pinchMidClientRef = useRef(null);
  const pinchMidContentRef = useRef(null);
  const pinchInitialScrollRef = useRef({ left: 0, top: 0 });

  const MIN_SCALE = 1;
  const MAX_SCALE = 3;
  const SCALE_STEP = 0.25;

  // ---------------- utilities ----------------
  const getMidpoint = (p1, p2) => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  });
  const getDistance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

  const clientPointToContent = (container, clientPoint, scale) => {
    const rect = container.getBoundingClientRect();
    return {
      x: (container.scrollLeft + (clientPoint.x - rect.left)) / scale,
      y: (container.scrollTop + (clientPoint.y - rect.top)) / scale,
    };
  };

  useEffect(() => {
    const container = containerRef.current;
    const target = zoomTargetRef.current;
    if (!container || !target) return;

    // ensure mobile gestures handled by our handlers
    container.style.touchAction = "none";

    const onPointerDown = (ev) => {
      container.setPointerCapture(ev.pointerId);
      // store basic pointer info and initialize prev values for panning
      pointersRef.current.set(ev.pointerId, {
        x: ev.clientX,
        y: ev.clientY,
        prevX: ev.clientX,
        prevY: ev.clientY,
      });

      // if second pointer appeared, initialize pinch tracking
      if (pointersRef.current.size === 2) {
        const [p1, p2] = [...pointersRef.current.values()];
        initialPinchDistRef.current = getDistance(p1, p2);

        // midpoint in client coords (absolute)
        const mid = getMidpoint(p1, p2);
        pinchMidClientRef.current = mid;

        // compute content coords at the base scale (so we can lock focal point)
        pinchMidContentRef.current = clientPointToContent(
          container,
          mid,
          baseScaleRef.current
        );

        // store initial scroll so we can compute new scroll relative to new scale
        pinchInitialScrollRef.current = {
          left: container.scrollLeft,
          top: container.scrollTop,
        };
      }
    };

    const onPointerMove = (ev) => {
      if (!pointersRef.current.has(ev.pointerId)) return;

      const entry = pointersRef.current.get(ev.pointerId);
      entry.x = ev.clientX;
      entry.y = ev.clientY;

      const pointers = [...pointersRef.current.values()];

      // PAN (single pointer)
      if (pointers.length === 1) {
        const p = pointers[0];
        const dx = p.x - p.prevX;
        const dy = p.y - p.prevY;

        container.scrollLeft -= dx;
        container.scrollTop -= dy;

        // update prev for next move
        p.prevX = p.x;
        p.prevY = p.y;
        return;
      }

      // PINCH ZOOM (two pointers)
      if (pointers.length === 2) {
        const [p1, p2] = pointers;
        const dist = getDistance(p1, p2);
        const startDist = initialPinchDistRef.current || dist;
        // ratio relative to the initial pinch distance
        const ratio = dist / startDist;
        let newScale = clamp(
          baseScaleRef.current * ratio,
          MIN_SCALE,
          MAX_SCALE
        );

        // apply transform to the inner target
        target.style.transformOrigin = "0 0";
        target.style.transform = `scale(${newScale})`;

        // update renderScale so JSX uses same visual scale (avoids reading refs during render)
        setRenderScale(newScale);

        // Use the midpoint **captured at pinch start** to keep focal point stable
        const midClient = pinchMidClientRef.current;
        if (midClient) {
          const rect = container.getBoundingClientRect();
          const clientOffsetX = midClient.x - rect.left;
          const clientOffsetY = midClient.y - rect.top;

          // pinchMidContentRef was computed using baseScaleRef at pinch start
          const contentCoord = pinchMidContentRef.current;
          if (contentCoord) {
            container.scrollLeft = contentCoord.x * newScale - clientOffsetX;
            container.scrollTop = contentCoord.y * newScale - clientOffsetY;
          }
        }
        return;
      }
    };

    const onPointerUp = (ev) => {
      // remove pointer
      pointersRef.current.delete(ev.pointerId);

      // cleanup prevX/prevY on remaining pointers so next pan starts fresh
      for (const p of pointersRef.current.values()) {
        p.prevX = p.x;
        p.prevY = p.y;
      }

      // if pinch ended (less than 2 pointers), commit the new scale as base
      if (pointersRef.current.size < 2) {
        // read current applied transform scale from target if possible
        const transform = window.getComputedStyle(target).transform;
        if (transform && transform !== "none") {
          // transform is of form matrix(a, b, c, d, e, f) ; scale = a (assuming uniform)
          const match = transform.match(/matrix\(([^,]+),/);
          if (match) {
            const appliedScale = parseFloat(match[1]);
            if (!Number.isNaN(appliedScale)) {
              baseScaleRef.current = appliedScale;
              // ensure UI state follows committed base scale
              setRenderScale(appliedScale);
            }
          }
        }
        initialPinchDistRef.current = null;
        pinchMidClientRef.current = null;
        pinchMidContentRef.current = null;
      }

      try {
        container.releasePointerCapture(ev.pointerId);
        // eslint-disable-next-line no-unused-vars
      } catch (e) {}
    };

    const onWheel = (ev) => {
      // only handle ctrl+wheel (typical pinch-gesture emulation on some devices)
      if (!ev.ctrlKey) return;
      ev.preventDefault();

      const rect = container.getBoundingClientRect();
      const clientPoint = { x: ev.clientX, y: ev.clientY };

      // compute content coordinate using the current base scale (before change)
      const contentCoord = clientPointToContent(
        container,
        clientPoint,
        baseScaleRef.current
      );

      const delta = ev.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
      const newScale = clamp(
        baseScaleRef.current + delta,
        MIN_SCALE,
        MAX_SCALE
      );

      target.style.transformOrigin = "0 0";
      target.style.transform = `scale(${newScale})`;

      // update renderScale so JSX uses same visual scale
      setRenderScale(newScale);

      const clientOffsetX = ev.clientX - rect.left;
      const clientOffsetY = ev.clientY - rect.top;

      container.scrollLeft = contentCoord.x * newScale - clientOffsetX;
      container.scrollTop = contentCoord.y * newScale - clientOffsetY;

      // commit immediately for wheel
      baseScaleRef.current = newScale;
    };

    // attach listeners
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    // cleanup
    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("wheel", onWheel);
    };
    // NOTE: intentionally empty deps: we attach handlers once and rely on refs.
  }, []);

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        paddingTop: HEADER_HEIGHT_PX,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
      }}
    >
      <Header title={"Surah "+surahName} />

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
            transform: `scale(${renderScale})`,
            transformOrigin: "0 0",
            width: "100%",
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
                fileUrl={`/surah/${id}.pdf`}
                defaultScale={SpecialZoomLevel.PageWidth}
              />
            </Worker>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
