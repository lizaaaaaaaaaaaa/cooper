import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main";
import HttpError from "./pages/HttpError";
import About from "./pages/About";
import News from "./pages/News";
import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import Enter from "./pages/Enter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/enter" element={<Enter />} />
        <Route path="/httpError" element={<HttpError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
