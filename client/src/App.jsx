import './App.css'
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Layout from './Components/Layout.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import UserRoute from './Routes/user.route.jsx';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/userPage/:username' element={<UserRoute />}/>
      </Route>
    </Routes>
  );
}

export default App;
