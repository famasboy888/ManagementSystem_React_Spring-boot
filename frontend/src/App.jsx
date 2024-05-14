import "./App.css";
import EmployeeComponent from "./components/EmployeeComponent";
import NotFound from "./components/error/NotFound";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";

//Router
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<ListEmployeeComponent />} />
        <Route path="/employees" element={<ListEmployeeComponent />} />
        <Route path="/add-employee" element={<EmployeeComponent />} />
        <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
