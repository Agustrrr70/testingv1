import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  const menuItems = [
    { img: "/images/surah.png" },
    { img: "/images/wirid.png" },
    { img: "/images/doa.png" },
    { img: "/images/khutbah.png" },
    { img: "/images/dalail.png" },
    { img: "/images/tasbih.png" },
    { img: "/images/burdah.png" },
    { img: "/images/simt.png" },
    { img: "/images/ma.png" },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(var(--vh) * 100)",
        backgroundImage: "url(/images/backgroundmain.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* KONTAINER-ALL */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          background: "gray",
          width: "100%",
          height: "55%",
          borderRadius: "20px 20px 0 0",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* GRID WRAPPER yang terkunci di dalam kontainer-all */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: "5px",
          }}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={{
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={item.img}
                style={{
                  width: "80%",
                  height: "83%",
                  objectFit: "fill",
                  borderRadius: "18%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
