import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Protection, Register, Dashboard } from "./pages";
import { Today, ThisWeek } from "./pages/dashboardPages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import { useDispatch } from "react-redux";
import { getUser } from "./features/user/userSlice";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  dispatch<any>(getUser());

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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        theme="light"
        limit={3}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </BrowserRouter>
  );
}

export default App;
