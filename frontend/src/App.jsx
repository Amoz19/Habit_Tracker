import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Layout from "./pages/Layout";
import NotFound from "./components/NotFound";
import Auth from "./components/auth/Auth";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import LandingPage from "./components/LandingPage.jsx";
import HabitCalendar from "./components/HabitCalendar.jsx";
import CalendarListLoadingSkeleton from "./components/CalendarListLoadingSkeleton.jsx";
const CalendarListWrapper = React.lazy(() =>
  import("./components/CalendarListWrapper.jsx")
);

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
                  <Suspense fallback={<CalendarListLoadingSkeleton />}>
                    <CalendarListWrapper />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path="/habits/:id"
              element={
                <RequireAuth>
                  <HabitCalendar />
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
