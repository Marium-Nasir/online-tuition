import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import AdminPage from "./Pages/AdminPage";
import TutorPage from "./Pages/TutorPage";
import StudentPage from "./Pages/StudentPage";
import SignupPage from "./Pages/SignupPage";
import Layout from "./Components/Layout";
import AccessByAdmin from "./Components/AccessByRole/AccessByAdmin";
import AccessByStudent from "./Components/AccessByRole/AccessByStudent";
import AccessByTutor from "./Components/AccessByRole/AccessByTutor";
const Temp = () => <h1>hello world</h1>
function App() {
  return (
    <div className="App">
    <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} exact/>
        
        <Route path="/signuppage" element={<SignupPage />} />

        {/* private routes */}
      <Route path="/" element={<Layout />}>
        <Route path="admin" element={<AccessByAdmin><AdminPage /></AccessByAdmin>} />
        <Route path="student" element={<AccessByStudent><StudentPage /></AccessByStudent>} />
        <Route path="student" element={<StudentPage />} />
        <Route path="tutor" element={<AccessByTutor><TutorPage /></AccessByTutor>} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
