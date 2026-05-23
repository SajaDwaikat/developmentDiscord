import {BrowserRouter,Routes,Route,Navigate,} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function ProtectedRoute({
  children,
}) {
  const token =
    localStorage.getItem(
      "token"
    );

  return token
    ? children
    : (
      <Navigate
        to="/login"
      />
    );
}

function App() {
  return (
    <BrowserRouter>

      <Toaster
        position="top-right"
      />

      <Routes>

        <Route
          path="/"
          element={
            <Register />
          }
        />

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;