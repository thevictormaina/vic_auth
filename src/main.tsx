import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AccountsMapTypeProvider } from "./contexts/accountsMapContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AccountsMapTypeProvider>
      <App />
    </AccountsMapTypeProvider>
  </React.StrictMode>
);
