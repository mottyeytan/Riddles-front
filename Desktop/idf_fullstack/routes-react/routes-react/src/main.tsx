
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Economy from "./pages/economy";
import Sports from "./pages/sports";
import Login from "./pages/Login";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function Home() {
  return <h1>Home</h1>;
}



const root: HTMLElement = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/economy" element={<Economy />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  </StrictMode>
);
