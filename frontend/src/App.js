import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import AdminPage from "./Pages/AdminPage";
import TutorPage from './Pages/TutorPage';
import StudentPage from './Pages/StudentPage';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/student" element={<StudentPage />} />
          <Route exact path="/tutor" element={<TutorPage />} />
        </Routes>
    </div>
  );
}

export default App;
