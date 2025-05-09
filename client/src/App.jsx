import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Events from './pages/Events';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/events' element={<Events/>} />
           <Route path='/admin' element={<AdminPanel/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
