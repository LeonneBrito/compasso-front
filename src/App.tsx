import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/:username" element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
