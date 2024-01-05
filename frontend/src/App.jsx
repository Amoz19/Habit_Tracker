import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import EnhancedCalendarList from "./components/CalendarList";
import EnhancedCalendar from "./components/Calendar";
import NotFound from "./components/NotFound";
import Auth from "./components/auth/Auth";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

import LandingPage from "./components/LandingPage.jsx";
import HabitsList from "./components/HabitsList.jsx";
import HabitCalendar from "./components/HabitCalendar.jsx";
import CalendarListLoadingSkeleton from "./components/CalendarListLoadingSkeleton.jsx";

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
                  <HabitsList />
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
