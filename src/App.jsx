import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ForecastDay from "./components/ForecastDay";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:day" element={<ForecastDay />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
