import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NotFound from "./components/NotFound";
import Auth from "./components/auth/Auth";
import { AuthContextProvider } from "./context/AuthContext.jsx";
// import RequireAuth from "./components/RequireAuth.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Loading from "./components/Loading.jsx";
HabitListWrapper;

import HabitListWrapper from "./components/HabitListWrapper.jsx";
import HabitCalendar from "./components/HabitCalendar.jsx";

// const LazyCalendarListWrapper = lazy(() =>
//   import("./components/CalendarListWrapper.jsx")
// );
// EnhancedCalendar

// const LazyEnhancedCalendar = lazy(() => import("./components/Calendar.jsx"));

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<Layout />}>
            <Route path="/habits" element={<HabitListWrapper />} />
            <Route path="/habits/:id" element={<HabitCalendar />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
