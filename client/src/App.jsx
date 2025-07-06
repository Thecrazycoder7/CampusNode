import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/LogPage/RegistrationForm.jsx";
import LoginForm from "./components/LogPage/LoginPage";
import LandingPage from "./components/Pages/LandingPage.jsx";
import Layout from "./components/Pages/Layout.jsx";
import Home from "./components/NavPage/Home.jsx";
import Chats from "./components/NavPage/Chats.jsx"
import Profile from "./components/NavPage/Profile.jsx";
import Resources from "./components/NavPage/Resources.jsx";
import ForumBoards from "./components/NavPage/forumBoards.jsx";

function App() {
  return (
    <div className="w-100">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="signup" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="/start" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chats" element={<Chats />} />
            <Route path="forumboards" element={<ForumBoards />} />
            <Route path="resources" element={<Resources />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
