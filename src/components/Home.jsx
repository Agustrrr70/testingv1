import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Kunci scroll ketika halaman ini terbuka
    document.body.style.overflow = "hidden";

    return () => {
      // Kembalikan seperti semula jika user keluar halaman
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: 'url(/images/backgroundmain.png)',
        backgroundSize: "100% 100%",   // stretch agar penuh
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
    </div>
  );
};

export default Home;
