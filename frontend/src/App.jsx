import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import EnhancedCalendarList from "./components/CalendarList";
import EnhancedCalendar from "./components/Calendar";
import NotFound from "./components/NotFound";
import Auth from "./components/auth/Auth";
import { AuthContextProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<EnhancedCalendarList />} />
            <Route path="/:id" element={<EnhancedCalendar />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
