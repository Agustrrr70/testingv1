import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // import hook navigasi

const Home = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState(null);

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
    { img: "/images/surah.png", route: "/surah" },
    { img: "/images/wirid.png", route: "/wirid" },
    { img: "/images/doa.png", route: "/doa" },
    { img: "/images/khutbah.png", route: "/khutbah" },
    { img: "/images/dalail.png", route: "/dalail" },
    { img: "/images/tasbih.png", route: "/tasbih" },
    { img: "/images/burdah.png", route: "/burdah" },
    { img: "/images/simt.png", route: "/simthud" },
    { img: "/images/ma.png", route: "/maulid" },
  ];

  const handleClick = (route, index) => {
    setActiveIndex(index);  
    setTimeout(() => {
      setActiveIndex(null);
      navigate(route);
    }, 150);
  };

  return (
    <div
      className="app-container"
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
          width: "100%",
          height: "57%",
          borderRadius: "20px 20px 0 0",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* GRID WRAPPER */}
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
              onClick={() => handleClick(item.route, index)}
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.15s ease-out",
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
