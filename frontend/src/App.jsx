import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import EnhancedCalendarList from "./components/CalendarList";
import EnhancedCalendar from "./components/Calendar";
import NotFound from "./components/NotFound";
import Auth from "./components/auth/Auth";
// import AuthForm from "./components/auth/AuthForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/authForm" element={<AuthForm />} /> */}
          <Route path="/home" element={<EnhancedCalendarList />} />
          <Route path="/:id" element={<EnhancedCalendar />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
