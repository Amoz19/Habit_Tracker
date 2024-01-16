import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NotFound from "./components/NotFound";
import Auth from "./components/auth/Auth";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Loading from "./components/Loading.jsx";

const LazyCalendarListWrapper = lazy(() =>
  import("./components/CalendarListWrapper.jsx")
);
const LazyEnhancedCalendar = lazy(() => import("./components/Calendar.jsx"));

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<Layout />}>
            <Route
              path="/habits"
              element={
                <RequireAuth>
                  <Suspense fallback={<Loading />}>
                    <LazyCalendarListWrapper />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path="/habits/:id"
              element={
                <RequireAuth>
                  <Suspense fallback={<Loading />}>
                    <LazyEnhancedCalendar />
                  </Suspense>
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
