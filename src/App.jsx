import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

// Section links pass { scrollTo: "<id>" } via router state instead of a
// URL hash, so the address bar never shows a "#section" fragment.
function ScrollManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (targetId) {
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      prevPathname.current = location.pathname;
      navigate(location.pathname, { replace: true, state: {} });
      return;
    }
    if (prevPathname.current !== location.pathname) {
      window.scrollTo(0, 0);
    }
    prevPathname.current = location.pathname;
  }, [location, navigate]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
