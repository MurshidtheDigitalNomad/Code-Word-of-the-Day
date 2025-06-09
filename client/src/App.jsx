import './App.css'
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Layout from './Components/Layout.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import UserRoute from './Routes/user.route.jsx';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/userPage/:username' element={<UserRoute />}/>
        </Route>
      </Routes>
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          toastClassName={() =>
            "bg-cyan-900 text-black font-roboto rounded-lg shadow-lg px-4 py-3 border-l-4 border-cyan-400 text-center mx-auto"
          }
          bodyClassName="text-sm"
          progressClassName="bg-cyan-400" />
      </>
  );
}

export default App;
