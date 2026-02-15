import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./utils/auth";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import View from "./pages/View";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return getToken() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <div className="w-screen h-screen bg-linear-to-br from-green-400 via-green-600 to-cyan-500 overflow-clip">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/vault/:id" element={<View />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
