import React from 'react'
import style from './LandingPage.module.css'
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
    <div className={style.container}>
      <div className={style.form}>
        <h1>THE  DOG  CLUB</h1>
        <Link to="/home">
        <button className={style.homeButton}>ENTRAR</button>
        </Link>
      </div>
    </div>
    </>
  )
}