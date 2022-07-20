import React from 'react';
import './assets/scss/global.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import components
import Navbar from './components/navbar/Navbar'

// import pages
import Login from './pages/login/Login'
import Register from './pages/register/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        {/* footer */}
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
