import './App.css';
import Homepage from './pages/Homepage.js';
import Info from './pages/Info.js';
import Register from './pages/Register.js';
import End from './pages/End.js';
import Check from './pages/Check.js';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Homepage />}/>
        <Route path = "/info" element={<Info />}/>
        <Route path = "/register" element={<Register />}/>
        <Route path = "/end" element={<End />}/>
        <Route path = "/check" element={<Check />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
