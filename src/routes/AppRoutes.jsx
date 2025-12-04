import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Surah from "../pages/Surah";
import Wirid from "../pages/Wirid";
import Doa from "../pages/Doa";
import Khutbah from "../pages/Khutbah";
import Dalail from "../pages/Dalail";
import Tasbih from "../pages/Tasbih";
import Burdah from "../pages/Burdah";
import Simthud from "../pages/Simthud";
import Maulid from "../pages/Maulid";
import Ayat from "../pages/Ayat";
import Index from "../pages/Index";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/surah" element={<Surah />} />
        <Route path="/wirid" element={<Wirid />} />
        <Route path="/doa" element={<Doa />} />
        <Route path="/khutbah" element={<Khutbah/>} />
        <Route path="/dalail" element={<Dalail />} />
        <Route path="/tasbih" element={<Tasbih />} />
        <Route path="/burdah" element={<Burdah />} />
        <Route path="/simthud" element={<Simthud />} />
        <Route path="/maulid" element={<Maulid />} />
        <Route path="/ayat/:folder/:id" element={<Ayat />} />
      </Routes>
    </BrowserRouter>
  );
}