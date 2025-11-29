import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src="/images/backgroundmain.png"   // sesuaikan nama file
        alt="Home Background"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default Home;
