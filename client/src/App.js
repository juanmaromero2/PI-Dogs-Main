import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearDogs, allDogs } from "./redux/actions";
import LandingPage from "./components/Landing/LandingPage"
import Cards from "./components/Cards/Cardss";
import Navbar from "./components/Navbar/Navbar";
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import style from "./App.css"

export default function App() {
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(()=>{
  dispatch(clearDogs())
  dispatch(allDogs()) 
  },[])

  useEffect(()=>{
    dispatch(clearDogs) && navigate("/")
  }, [])

  return (
    <div className={style.App}>
              {
          location.pathname !== "/"? <Navbar /> : null
        }
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/home" element={<Cards dogs={dogs}/>}/>
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  )
}

