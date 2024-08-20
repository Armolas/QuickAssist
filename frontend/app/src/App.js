import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Providers from './pages/Providers';
import ScrollToTop from './components/ScrollToTop';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import RequestResetPassword from './pages/RequestResetPassword';
import About from './pages/About';


function App() {
  return (
    <>
      <ScrollToTop/>
      <ToastContainer />
      <div className="flex flex-col bg-violet-100 h-full font-serif">
        <Header/>
        <div className='flex-grow flex flex-col justify-center'>
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/signup" element={ <SignUp/> }/>
            <Route path="/verify-email" element={ <VerifyEmail/> }/>
            <Route path="/reset-password" element={ <ResetPassword/> }/>
            <Route path="/request-reset-password" element={ <RequestResetPassword/> }/>
            <Route path="/about" element={ <About/> }/>
            <Route 
              path="/providers" 
              element={
                <ProtectedRoute 
                  component={Providers} 
                />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute 
                  component={Profile} 
                />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute 
                  component={Dashboard} 
                />
              } 
            />
          </Routes>
          </div>
        <Footer/>
      </div>
    </>
  );
}

export default App;
