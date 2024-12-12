import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz";

function App() {
  return (
    <div className="font-[Roboto]">
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
