import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Task from './components/Task';
import Notes from './components/Notes';
import About from './components/About';
import Footer from './components/Footer';
import Contact from './components/Contact';
import {Routes,Route} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  
  const [open, setOpen] = useState(false);
  const [msg,setMsg] = useState('');
  const [severity,setSeverity] = useState('');

  const handleSnack = (msg,severity) => {
    setMsg(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }


  return (
    <>
      <Navbar handleSnack={handleSnack} />
      <Routes>
        <Route path="/" element={<Home handleSnack={handleSnack} />} exact />
        <Route path="/tasks" element={<Task handleSnack={handleSnack}/>} exact />
        <Route path="/notes" element={<Notes handleSnack={handleSnack}/>} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/contact" element={<Contact handleSnack={handleSnack}/>} exact />
      </Routes>
      <Footer />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
