import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Header from './components/Header'
import { loginToAccount } from './slices/userSlice';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './pages/Login';
import Home from './pages/Home';
import Container from '@mui/material/Container';
import RegisterForm from './pages/Register'

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userInfo)
  const isLogin = useSelector((store) => store.user.isLogin)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(loginToAccount(userData));
    }
  }, [dispatch]);

  return (
    <>
      <Header isLogin={isLogin} user={user} />
      <Container maxWidth="sm">
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegisterForm />} />
        </Routes>
      </Container>
    </>
  )
}

export default App;
