import React, { useState, useEffect } from "react";

const Tasbih = () => {
  const [count, setCount] = useState(0);

  // --- HITUNG --vh UNTUK MOBILE (menghindari terpotong oleh navigation bar) ---
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
    tasbih: { top: "5%", left: "-25%", width: "150%", height: "90%" },
    counter: { top: "20%" },
    button: { bottom: "19%", left: "50%" },
    reset: { bottom: "37.5%", left: "63.5%" },
  };

  const formatted = String(count).padStart(4, "0");

  return (
    <div
      style={{
        width: "100vw",
        // gunakan --vh yang sudah dihitung untuk menghindari terpotong di mobile
        height: "calc(var(--vh) * 100)",
        backgroundImage: "url(/images/backgroundtasbih.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "40%",
          borderRadius: "20px",
          backgroundColor: "rgba(147,146,146,0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* GAMBAR TASBIH */}
        <img
          src="/images/tasbihactiv.png"
          alt="tasbih"
          style={{
            position: "absolute",
            ...POS.tasbih,
            objectFit: "fill",
            borderRadius: "20px",
            pointerEvents: "none",
            opacity: 0.98,
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
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "clamp(1.6rem, 6vw, 2.4rem)",
              letterSpacing: 2,
              background: "rgba(0, 0, 0, 0.35)",
              padding: "6px 14px",
              borderRadius: 8,
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            {formatted}
          </div>
        </div>

        {/* BUTTON KLIK */}
        <button
          onClick={() => setCount(count + 1)}
          style={{
            position: "absolute",
            width: "30%",
            height: "30%",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            bottom: POS.button.bottom,
            left: POS.button.left,
            transform: "translateX(-50%)",
            cursor: "pointer",
          }}
        >
          <img
            src="/images/buttonklik.png"
            alt="klik"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              filter:
                "brightness(0) saturate(100%) invert(18%) sepia(95%) saturate(7481%) hue-rotate(1deg) brightness(94%) contrast(118%)",
            }}
          />
        </button>

        {/* BUTTON RESET */}
        <button
          onClick={() => setCount(0)}
          style={{
            position: "absolute",
            width: "10%",
            height: "10%",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            bottom: POS.reset.bottom,
            left: POS.reset.left,
            transform: "translateX(-50%) translateY(-120%)",
            cursor: "pointer",
          }}
        >
          <img
            src="/images/buttonklik.png"
            alt="reset"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              filter:
                "brightness(0) saturate(100%) invert(18%) sepia(95%) saturate(7481%) hue-rotate(1deg) brightness(94%) contrast(118%)",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Tasbih;
