import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import EnhancedCalendarList from "./components/CalendarList";
import EnhancedCalendar from "./components/Calendar";
import NotFound from "./components/NotFound";
import Auth from "./components/auth/Auth";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Loading from "./components/Loading.jsx";
import Home from "./components/Home.jsx";
import LandingPage from "./components/LandingPage.jsx";

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
                  <EnhancedCalendarList />
                </RequireAuth>
              }
            />
            <Route
              path="/habits/:id"
              element={
                <RequireAuth>
                  <EnhancedCalendar />
                </RequireAuth>
              }
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
