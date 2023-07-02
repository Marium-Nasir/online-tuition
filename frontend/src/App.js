import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import AdminPage from "./Pages/AdminPage";
import TutorPage from "./Pages/TutorPage";
import StudentPage from "./Pages/StudentPage";
import SignupPage from "./Pages/SignupPage";
import Layout from "./Components/Layout";

function App() {
  return (
    <div className="App">
    <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} exact />
        <Route exact path="/signuppage" element={<SignupPage />} />

        {/* private routes */}
      <Route path="/" element={<Layout />}>
        <Route path="admin" element={<AdminPage />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="tutor" element={<TutorPage />} />
      </Route>
    </Routes>
    </div>
    // <div className="App">
    //     <Routes>
    //       <Route path="/" element={<Home />} exact />
    //       <Route exact  path="/signuppage" element={<SignupPage />}  />
    //       <Route exact path="/admin" element={<AdminPage />} />
    //       <Route exact path="/student" element={<StudentPage />} />
    //       <Route exact path="/tutor" element={<TutorPage />} />
    //     </Routes>
    // </div>
  );
}

export default App;
