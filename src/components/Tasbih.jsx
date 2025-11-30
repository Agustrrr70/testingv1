import React, { useState, useEffect } from "react";
import Header, { HEADER_HEIGHT_PX } from "./Header";

const Tasbih = () => {
  const [count, setCount] = useState(0);
  const [pressClick, setPressClick] = useState(false);
  const [pressReset, setPressReset] = useState(false);

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  const POS = {
    tasbih: { top: "11%", left: "-25%", width: "150%", height: "78%" },
    counter: { top: "24%" },
    button: { bottom: "22%", left: "49.5%" },
    reset: { bottom: "36%", left: "63.3%" },
  };

  const formatted = String(count).padStart(4, "0");

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(var(--vh) * 100)", // ✅ FIX BACKGROUND MOBILE
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* HEADER GLOBAL */}
      <Header title="Tasbih Digital" />

      {/* SEMUA KONTEN DI BAWAH HEADER */}
      <div
        style={{
          width: "100%",
          height: `calc((var(--vh) * 100) - ${HEADER_HEIGHT_PX}px)`, // ✅ FIX MOBILE
          marginTop: `${HEADER_HEIGHT_PX}px`,
          backgroundImage: "url(/images/backgroundtasbih.png)",
          backgroundSize: "100% 100%", // stretch penuh TIDAK TERPOTONG
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "76%",
            height: "40%",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            position: "relative",
          }}
        >
          {/* TASBIH IMAGE */}
          <img
            src="/images/tasbihactiv.png"
            alt="tasbih"
            style={{
              position: "absolute",
              ...POS.tasbih,
              objectFit: "fill",
              pointerEvents: "none",
            }}
          />

          {/* COUNTER */}
          <div
            style={{
              position: "absolute",
              top: POS.counter.top,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Digital7, monospace",
                fontSize: "clamp(3.2rem, 9vw, 4.8rem)",
                fontWeight: 500,
              }}
            >
              {formatted}
            </div>
          </div>

          {/* BUTTON KLIK */}
          <button
            onClick={() => {
              setPressClick(true);
              setCount(count + 1);
              setTimeout(() => setPressClick(false), 120);
            }}
            style={{
              position: "absolute",
              width: "28%",
              height: "27%",
              borderRadius: "50%",
              border: "none",
              background: "transparent",
              bottom: POS.button.bottom,
              left: POS.button.left,
              transform: `translateX(-50%) scale(${pressClick ? 1.08 : 1})`,
              transition: "transform 120ms ease-out",
            }}
          >
            <img
              src="/images/buttonklik.png"
              alt="klik"
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
            />
          </button>

          {/* BUTTON RESET */}
          <button
            onClick={() => {
              setPressReset(true);
              setCount(0);
              setTimeout(() => setPressReset(false), 120);
            }}
            style={{
              position: "absolute",
              width: "10%",
              height: "10%",
              borderRadius: "50%",
              border: "none",
              background: "transparent",
              bottom: POS.reset.bottom,
              left: POS.reset.left,
              transform: `translateX(-50%) translateY(-120%) scale(${
                pressReset ? 1.1 : 1
              })`,
              transition: "transform 120ms ease-out",
            }}
          >
            <img
              src="/images/buttonklik.png"
              alt="reset"
              style={{ width: "98%", height: "73%", objectFit: "fill" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasbih;
