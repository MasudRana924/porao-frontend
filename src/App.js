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
import PrivateRoute from './components/route/PrivateRoute';
import StudentProfile from './pages/feature/student/profile/StudentProfile';
import io from 'socket.io-client';
import { Button, message } from 'antd';
import OtpVerify from './pages/auth/tutor/OtpVerify';
import MainProfile from './pages/feature/tutor/profile/profiledashboard/MainProfile';
import BatchForm from './pages/feature/tutor/batch/BatchForm';
import TutorDashboard from './pages/feature/tutor/dashoboard/TutorDashboard';
import SingleBatch from './pages/singlebatch/SingleBatch';
import MainStudentDashboard from './pages/feature/student/dashboard/MainStudentDashboard';
import StudentDashboard from './pages/feature/student/dashboard/StudentDashboard';
import StudentEnrollment from './pages/feature/student/enrollment/StudentEnrollment';
import TutorEnrollment from './pages/feature/tutor/enrollment/TutorEnrollment';
import TutorBatchList from './pages/feature/tutor/batch/TutorBatchList';
const socket = io('http://localhost:8088', {
  transports: ['websocket', 'polling']
});

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  })
  useEffect(() => {
    // Log when socket connects
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    // Log any connection errors
    socket.on('connect_error', (error) => {
      console.log('WebSocket connection error:', error);
    });
    // Subscribe to new-notification event
    //backend e websocket emit kora hoise new-notification name e so ei khane same name ei catch
    socket.on('new-notification', (notification) => {
      message.success(notification.message)
      console.log('Received new notification:', notification.message);
      // toast.info(notification.message); // Display the notification
    });
    // Log when socket disconnects
    socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
    });
    // Cleanup function to remove the event listeners
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('new-notification');
      socket.off('disconnect');
    };
  }, []);
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
              <Route path='/student/profile' element={<PrivateRoute><StudentProfile></StudentProfile></PrivateRoute>}></Route>
              {/* teachers route */}
              <Route path='/auth/tutor/register' element={<TutorRegister />}></Route>
              <Route path='/auth/tutor/verify/account' element={<OtpVerify />}></Route>
              <Route path='/auth/tutor/login' element={<TutorLogin />}></Route>
              <Route path='/tutor/create/post' element={<CreatePost />}></Route>
              {/* profile dashboard */}
              <Route path='/tutor/profile' element={<Profile />}></Route>
              <Route path='/tutor/dashboard' element={<MainProfile />}>
                <Route index element={<TutorDashboard />} />
                <Route path="/tutor/dashboard/profile" element={<Profile />} />
                <Route path="/tutor/dashboard/upload/batch" element={<BatchForm />} />
                <Route path="/tutor/dashboard/enrollment" element={<TutorEnrollment />} />
                <Route path="/tutor/dashboard/batch" element={<TutorBatchList />} />
              </Route>

              {/* single batches post detaisl */}
              <Route path="/batch/:batchId" element={<SingleBatch/>} />
              {/* student dashboard */}
              <Route path='/student/dashboard' element={<MainStudentDashboard />}>
                <Route index element={<StudentDashboard />} />
                <Route path="/student/dashboard/profile" element={<StudentProfile />} />
                <Route path="/student/dashboard/enrollment" element={<StudentEnrollment />} />
                {/* <Route path="account" element={<Account />} /> */}
                {/* <Route path="attendance" element={<Attendance />} /> */}
              </Route>
            </Routes>
            <Footer></Footer>
          </BrowserRouter>
        </div>}
    </div>
  );
}

export default App;
