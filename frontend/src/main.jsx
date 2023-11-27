import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CalendarDataContextProvider from "./context/CalendarData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CalendarDataContextProvider>
      <App />
    </CalendarDataContextProvider>
  </React.StrictMode>
);
