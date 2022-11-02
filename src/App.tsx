import './assets/scss/global.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import auth
import { AuthProvider } from './context/AuthProvider';
import PersistLogin from './PersistLogin'

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
import NewProduct from './pages/new_product/NewProduct';
import Menu from './pages/menu/Menu';
import OrderList from './pages/order/OrderList';
import NewOrder from './pages/order/NewOrder';

import axios from '../src/api/axios';
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider >
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/reservation' element={<Reservation />} />
              <Route path='/reset-password' element={<Reset />} />
              <Route path='/confirm-reset-password' element={<ResetConfirmation />} />
              <Route path='/new-product' element={<NewProduct />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/order-list' element={<OrderList />} />
              <Route path='/new-order' element={<NewOrder />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </div >
    </AuthProvider>
  );
}

export default App;
