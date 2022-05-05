import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Task from './components/Task';
import Notes from './components/Notes';
import About from './components/About';
import Contact from './components/Contact';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/tasks" element={<Task />} exact/>
        <Route path="/notes" element={<Notes />} exact/>
        <Route path="/about" element={<About />} exact/>
        <Route path="/contact" element={<Contact />} exact/>
      </Routes>
    </>
  );
}

export default App;
