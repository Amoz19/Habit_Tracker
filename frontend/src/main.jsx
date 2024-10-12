import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { QueryClientProvider, QueryClient } from "react-query";
// import Auth from "./components/auth/Auth.jsx";
// import { AuthContextProvider } from "./context/AuthContext.jsx";
// import { ReactQueryDevtools } from "react-query-devtools"
import { Provider } from "react-redux";
import { store } from "./app/store.js";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   },
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AuthContextProvider> */}
      {/* <QueryClientProvider client={queryClient}> */}
      <App />
      {/* </QueryClientProvider> */}
      {/* </AuthContextProvider> */}
    </Provider>
  </React.StrictMode>
);
