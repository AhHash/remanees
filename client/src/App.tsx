import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Protection, Register, Dashboard } from "./pages";
import { Today, ThisWeek } from "./pages/dashboardPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route
          path="dashboard"
          element={
            <Protection>
              <Dashboard />
            </Protection>
          }
        >
          <Route index element={<Today />} />
          <Route path="weekly" element={<ThisWeek />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
