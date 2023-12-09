import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CalendarDataContextProvider from "./context/CalendarData.jsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthContextProvider } from "./context/AuthContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <CalendarDataContextProvider> */}
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthContextProvider>

    {/* </CalendarDataContextProvider> */}
  </React.StrictMode>
);
