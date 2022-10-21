import React, { useEffect, useState } from 'react';
import './assets/scss/global.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import auth
import { AuthContext } from './context/AuthContext';
import { AuthInterface } from './interfaces/AuthInterface';

// import components
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer';

// import pages
import Login from './pages/login/Login'
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Reservation from './pages/reservation/Reservation';
import Reset from './pages/password_reset/Reset';
import ResetConfirmation from './pages/password_reset/ResetConfirmation';

import axios from '../src/api/axios';

axios.defaults.withCredentials = true;

function App() {

  const [authState, setAuthState] = useState<AuthInterface>(
    {
      id: 0,
      isLogged: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      sex: '',
      points: 0,
      hourlyRate: 0,
      role: 0
    }
  )

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reservation' element={<Reservation />} />
            <Route path='/reset-password' element={<Reset />} />
            <Route path='/confirm-reset-password' element={<ResetConfirmation />} />
          </Routes>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div >
  );
}

export default App;
