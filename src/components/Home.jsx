import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: 'url(/images/backgroundmain.png)',
        backgroundSize: "100% 100%",   // stretch agar selalu memenuhi layar
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Letakkan elemen lain di sini */}
    </div>
  );
};

export default Home;
