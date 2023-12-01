import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarList from "./components/CalendarList";
import { NotFound } from "./components/NotFound";
import Layout from "./pages/Layout";
import Calendar from "./components/Calendar";
import Test from "./components/Test";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CalendarList />} />
          <Route path="/ani" element={<Test />} />
          <Route path="/:id" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
