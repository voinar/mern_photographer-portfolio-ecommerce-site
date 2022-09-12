import "./styles/style.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Context from "./contexts/Context";

import Navbar from "./components/Navbar";
import SectionWelcome from "./pages/SectionWelcome";
import SectionContent from "./pages/SectionContent";
import About from "./pages/About";
import Exercises from "./pages/Exercises";

// {localStorage.setItem('user', 'name')}
// {sessionStorage.setItem('status', 'unread')}
// {document.cookie='user=new'}
// {document.cookie='myCookie=init; expires=' + new Date(2022, 7, 28, 11, 52, 30)}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Context.Provider value={{ darkMode, setDarkMode }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<SectionWelcome />} />
          <Route path="/witaj" element={<SectionWelcome />} />
          <Route path="/:category" element={<SectionContent />} />
          <Route path="/o%20mnie" element={<About />} />
          <Route path="/exercises" element={<Exercises props={darkMode}/>} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
