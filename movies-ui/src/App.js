import './App.css';
import api from './api/axiosConfig';
import { useState,useEffect } from 'react';
import Layout from './components/Layout';
import {Routes,Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Login from './components/login/Login';
import Register from './components/register/Register';
import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [movies,setMovies] = useState([]);
  const getMovies = async()=>{
    try{
      const response = await api.get("/api/v1/movies");
      console.log(response.data)
      setMovies(response.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getMovies();
  },[])
  return (
    <div className="App">
    <ToastContainer />
    <Header/>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home movies={movies}/>}/>
        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>
    </Routes>
    </div>
  );
}

export default App;
