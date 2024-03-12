import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./pages/Main";
import HttpError from "./pages/HttpError";
import About from "./pages/About";
import News from "./pages/News";
import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/httpError" element={<HttpError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
