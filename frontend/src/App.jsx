import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import NotFound from "./components/NotFound";
import LandingPage from "./components/LandingPage.jsx";
import Loading from "./components/Loading.jsx";
import HabitListWrapper from "./components/HabitListWrapper.jsx";
import HabitCalendar from "./components/HabitCalendar.jsx";
import Login from "./components/auth/Login.jsx";
// import useAuthContext from "./hook/useAuthContext.js";
import Signup from "./components/auth/Signup.jsx";
import RequireAuth from "./components/auth/RequireAuth.jsx";
import { MonthlyProgress } from "./components/habits/MonthlyProgress";
import WeeklyProgress from "./components/habits/WeeklyProgress";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/weeklyProgress" element={<WeeklyProgress />} />
          <Route path="/monthlyProgress" element={<MonthlyProgress />} />
          <Route path="/habits" element={<HabitListWrapper />} />
          <Route path="/habits/:id" element={<HabitCalendar />} />
        </Route>
        <Route path="/loading" element={<Loading />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
