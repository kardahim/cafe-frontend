import './assets/scss/global.scss'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import auth
import { AuthProvider } from './context/AuthProvider';
import PersistLogin from './PersistLogin'

// import independent components
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer';
import NotFound from './components/notFound/NotFound';

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
import Order from './pages/order/Order';
import Dashboard from './pages/dashboard/Dashboard';
import NewSpecialOffer from './pages/new_special_offert/NewSpecialOffer';
import NewCoupon from './pages/new_coupon/NewCoupon';
import Profile from './pages/profile/Profile';

import { useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import useRefreshToken from './hooks/useRefreshToken';

// axios
import axios from '../src/api/axios';
import { CircularProgress } from '@mui/material';
import AboutUs from './pages/aboutUs/AboutUs';
axios.defaults.withCredentials = true;


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isLogged: false,
    accessToken: '',
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    roleId: 0,
    phone: ''
  });
  // FIXME: sometimes not work, authState is not a function
  const refresh = useRefreshToken(setAuthState);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      }
      catch (err) {
        console.error(err);
      }
      finally {
        isMounted && setIsLoading(false);
      }
    }
    !authState?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => { isMounted = false };
  }, [authState])

  const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const roleId = authState.roleId

    if (roleId === 2) return children
    else return <Navigate to='/' />
  }
  const EmployeeRoute = ({ children }: { children: JSX.Element }) => {
    const roleId = authState.roleId

    if (roleId === 2 || roleId === 3) return children
    else return <Navigate to='/' />
  }
  const LoggedRoute = ({ children }: { children: JSX.Element }) => {
    const isLogged = authState.isLogged

    if (isLogged) return children
    else return <Navigate to='/' />
  }
  const LoggedOffRoute = ({ children }: { children: JSX.Element }) => {
    const isLogged = authState.isLogged

    if (!isLogged) return children
    else return <Navigate to='/' />
  }
  return (
    <div className="App">
      {!isLoading ?
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <Navbar />
            <Routes>
              {/* admin only routes */}
              <Route path='/dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} />
              <Route path='/new-product' element={<AdminRoute><NewProduct /></AdminRoute>} />
              <Route path='/new-special-offer' element={<AdminRoute><NewSpecialOffer /></AdminRoute>} />
              <Route path='/new-employee' element={<AdminRoute><Register isAdmin={true} /></AdminRoute>} />
              <Route path='/new-coupon' element={<AdminRoute><NewCoupon /></AdminRoute>} />
              {/* staff routes */}
              <Route path='/order-list' element={<EmployeeRoute><OrderList /></EmployeeRoute>} />
              <Route path='/new-order' element={<EmployeeRoute><NewOrder /></EmployeeRoute>} />
              <Route path='/order/:id' element={<EmployeeRoute><Order /></EmployeeRoute>} />
              {/* logged user routes */}
              <Route path='/reservation' element={<LoggedRoute><Reservation /></LoggedRoute>} />
              <Route path='/profile' element={<LoggedRoute><Profile /></LoggedRoute>} />
              {/* logged off routes */}
              <Route path='/login' element={<LoggedOffRoute><Login /></LoggedOffRoute>} />
              <Route path='/register' element={<LoggedOffRoute><Register isAdmin={false} /></LoggedOffRoute>} />
              <Route path='/reset-password' element={<LoggedOffRoute><Reset /></LoggedOffRoute>} />
              <Route path='/confirm-reset-password' element={<LoggedOffRoute><ResetConfirmation /></LoggedOffRoute>} />
              {/* everyone routes */}
              <Route path='/' element={<Home />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </AuthContext.Provider>
        :
        <CircularProgress sx={{ margin: 'auto auto', color: '#DCC080' }} size={200} />}
    </div >
  );
}

export default App;
