import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthcontextProvier from "./Context/Authcontext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthcontextProvier>
      <App />
    </AuthcontextProvier>
  </React.StrictMode>
);
