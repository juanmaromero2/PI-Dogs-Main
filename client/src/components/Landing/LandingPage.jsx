import React from 'react'
import style from './LandingPage.module.css'
import { Link } from "react-router-dom";
import Img from '../../img/perro-chiquito-sin-fondo.png'


export default function LandingPage() {
  return (
  <div className={style.supercontainer}>
    <div className={style.container}>
      <div className={style.minicontainer}>
        <h1>True  Friend</h1>
        <p className={style.intro}>Are you a dog lover? Are you curious about the various breeds that make up the wonderful world of canines? Welcome to our website, your premier destination to discover and learn about different dog breeds!
      </p>
        <Link to="/home">
        <button className={style.homeButton}>ENTER</button>
        </Link>
        
      </div>
      <div className={style.imagen}>
        <img src={Img} alt='perro chiquito'/>
      </div>
    </div>
  </div>
  )
}