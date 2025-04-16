import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import DesktopIcons from './components/DesktopIcons';

function App() {
  return (
    <div className="App">
      <DesktopIcons />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Navbar />
    </div>
  );

export default App;
