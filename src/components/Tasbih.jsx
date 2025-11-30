import React, { useState, useEffect } from "react";

const Tasbih = () => {
  const [count, setCount] = useState(0);
  const [pressClick, setPressClick] = useState(false); // animasi tombol klik
  const [pressReset, setPressReset] = useState(false); // animasi tombol reset

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
              fontFamily: "Digital7, monospace",
              fontSize: "clamp(2.8rem, 9vw, 4.8rem)",
              fontWeight: 500,
              letterSpacing: "2px",
              padding: "1px 12px",
              borderRadius: "6px",
              color: "#383838ff",
              transform: "translateX(1px)",
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
            width: "30%",
            height: "27%",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            bottom: POS.button.bottom,
            left: POS.button.left,
            transform: `translateX(-50%) scale(${pressClick ? 1.08 : 1})`,
            transition: "transform 120ms ease-out",
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
            }}
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
            transform: `translateX(-50%) translateY(-120%) scale(${pressReset ? 1.1 : 1})`,
            transition: "transform 120ms ease-out",
            cursor: "pointer",
          }}
        >
          <img
            src="/images/buttonklik.png"
            alt="reset"
            style={{
              width: "105%",
              height: "73%",
              objectFit: "fill",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Tasbih;
