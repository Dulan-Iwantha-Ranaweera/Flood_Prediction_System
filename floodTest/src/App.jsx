import './App.css';
import About from './components/About';
import Mainsection from './components/MainSection';
import Navbar from './components/Navbar';
import Secondsection from './components/Secondsection';
import Thirdsection from './components/Thirdsection';
import Footer from './components/Footer';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin/Admin';
import AdminLogin from './components/AdminLogin';

function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  return isAuth ? children : <Navigate to="/admin-login" />;
}

function App() {
  return (
    <>
      <Routes>
       
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Mainsection />
              <Secondsection />
              <Thirdsection />
              <About />
              <Footer />
            </>
          }
        />

        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
