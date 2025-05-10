import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz";

function App() {
  return (
    <div className="font-[Roboto] bg-[#23232c] min-h-svh transition-all duration-300">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
