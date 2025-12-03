import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Surah from "../components/Surah";
import Wirid from "../components/Wirid";
import Doa from "../components/Doa";
import Khutbah from "../components/Khutbah";
import Dalail from "../components/Dalail";
import Tasbih from "../components/Tasbih";
import Burdah from "../components/Burdah";
import Simthud from "../components/Simthud";
import Maulid from "../components/Maulid";
import Ayat from "../components/Ayat";
import Index from "../components/Index";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
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
        <Route path="/ayat/:id" element={<Ayat />} />
      </Routes>
    </BrowserRouter>
  );
}