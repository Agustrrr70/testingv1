import React, { useEffect } from "react";

const Tasbih = () => {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(var(--vh) * 100)",
        backgroundImage: "url(/images/backgroundtasbih.png)",
        backgroundSize: "100% 100%",   // background tetap stretch penuh
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Kontainer utama */}
      <div
        style={{
          width: "80%",        // 100% dari parent → otomatis stretch penuh
          height: "40%",        // tetap responsif tinggi
          borderRadius: "20px",
          backgroundColor: "rgba(147, 146, 146, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        <p>Kontainer Tasbih.</p>
      </div>
    </div>
  );
};

export default Tasbih;
