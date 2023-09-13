import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkoutsProvider } from "./context/WorkoutContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WorkoutsProvider>
  </React.StrictMode>
);
