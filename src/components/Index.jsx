import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  const handleMasuk = async () => {
    setActive(true);

    // coba masuk fullscreen (harus di-trigger oleh klik user)
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      await elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      await elem.msRequestFullscreen();
    }

    setTimeout(() => {
      setActive(false);
      navigate("/home");
    }, 150);
  };

  return (
    <div
      className="app-container"
      style={{
        width: "100vw",
        height: "calc(var(--vh) * 100)",
        backgroundImage: "url(/images/splash.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* TOMBOL DI TENGAH BAWAH */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "18%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          onClick={handleMasuk}
          style={{
            width: "40%",
            height: "25%",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            transition: "transform 0.15s ease-out",
            transform: active ? "scale(1.05)" : "scale(1)", // efek menu
            backdropFilter: "blur(4px)",
          }}
        >
          Masuk
        </div>
      </div>
    </div>
  );
};

export default Index;
