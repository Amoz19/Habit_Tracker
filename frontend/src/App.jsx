import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotFound } from "./components/NotFound";
import Layout from "./pages/Layout";

import EnhancedCalendarList from "./components/CalendarList";
import EnhancedCalendar from "./components/Calendar";
import Loading from "./components/Loading";

// import Test from "./components/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EnhancedCalendarList />} />
          <Route path="/:id" element={<EnhancedCalendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
