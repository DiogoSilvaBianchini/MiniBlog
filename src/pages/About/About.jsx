import React from 'react'
import { Link } from 'react-router-dom'
import style from './About.module.css'

const About = () => {
  return (
    <div className={style.container}>
      <h1>Sobre a aplicação</h1>
      <p>O projeto consiste em um mini blog, desenvolvido em React (Front-end) e FireBase (Back-end)</p>

      <Link to={"/post/create"} className="btn">Criar novo post</Link>
    </div>
  )
}

export default About