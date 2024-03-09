import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './pages/common/Navbar';
import Register from './pages/auth/student/Register';
import Login from './pages/auth/student/Login';
import Footer from './pages/common/Footer';
import Home from './pages/home/Home';
import TutorRegister from './pages/auth/tutor/TutorRegister';
import TutorLogin from './pages/auth/tutor/TutorLogin';
import CreatePost from './pages/tutor/jobpost/CreatePost';
import { useState } from 'react';
import { useEffect } from 'react';
import Preloader from './components/loader/Preloader';
import Profile from './pages/feature/tutor/profile/Profile';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  })
  return (
    <div>
      {loading ? <div>
        <Preloader></Preloader>
      </div> :
        <div className="App">
          <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/auth/student/register' element={<Register />}></Route>
              <Route path='/auth/student/login' element={<Login />}></Route>
              {/* teachers route */}
              <Route path='/auth/tutor/register' element={<TutorRegister />}></Route>
              <Route path='/auth/tutor/login' element={<TutorLogin />}></Route>
              <Route path='/tutor/create/post' element={<CreatePost />}></Route>
              {/* profile dashboard */}
              <Route path='/tutor/profile' element={<Profile />}></Route>
            </Routes>
            <Footer></Footer>
          </BrowserRouter>
        </div>}
    </div>
  );
}

export default App;
