import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotFound } from "./components/NotFound";
import Layout from "./pages/Layout";

import EnhancedComponent from "./components/Calendar";
import EnhancedCalendarList from "./components/CalendarList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EnhancedCalendarList />} />
          <Route path="/:id" element={<EnhancedComponent />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
