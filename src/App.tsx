import React, { useEffect } from 'react';
import './assets/scss/global.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import components
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer';

// import pages
import Login from './pages/login/Login'
import Register from './pages/register/Register';
import Home from './pages/home/Home';

import axios from '../src/api/axios';

axios.defaults.withCredentials = true;



function App() {

  // useEffect(() => {
  //   axios.post("/users/auth").then((response) => {
  //     console.log(response)

  //     // console.log(response.data.user)   // <- dane zalogowanego usera; do wykorzystania np w usestate czy coś
  //   })
  // }, [])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
