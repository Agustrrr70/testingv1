import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Hitung tinggi layar aktual (bukan 100vh palsu milik mobile browser)
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(var(--vh) * 100)",  // 100% tinggi layar HP asli
        backgroundImage: "url(/images/backgroundmain.png)",
        backgroundSize: "100% 100%",       // stretch agar selalu penuh
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",                // pastikan tidak bisa scroll
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* ---- Contoh konten di atas background ---- */}
      <div
        style={{
          marginTop: "20px",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          textShadow: "0 2px 6px rgba(0,0,0,0.6)",
        }}
      >

      </div>

      {/* Tambahkan menu / tombol / elemen lain di sini */}
    </div>
  );
};

export default Home;
