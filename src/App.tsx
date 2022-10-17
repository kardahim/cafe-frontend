import React from 'react';
import './assets/scss/global.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
