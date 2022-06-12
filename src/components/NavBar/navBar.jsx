import logo from '../../logo.svg';
import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import style from './navBar.module.css'
import { useAuthValue } from '../../context/AuthContext';
import { useAuthentication} from '../../hooks/useAuthentication';

const NavBar = () => {
  const {user} = useAuthValue()
  const {LogOut} = useAuthentication();


  return (
    <div className={style.ContainerHeader}>
        <nav>
            <Link to="/"><img src={logo} alt="logo"/></Link>
            <ul>
              <li>
                <NavLink to="/" className={({isActive}) => (isActive ? "active": null)}>Home</NavLink>
              </li>
              <li>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink to="/Login" className={({isActive}) => (isActive ? "active": null)}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={({isActive}) => (isActive ? "active": null)}>Registro</NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                <li>
                    <NavLink to="/post/create" className={({isActive}) => (isActive ? "active": null)}>Novo post</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashbord" className={({isActive}) => (isActive ? "active": null)}>DashBord</NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/about" className={({isActive}) => (isActive ? "active": null)}>Sobre</NavLink>
              </li>
              {user && (
                <button onClick={LogOut}>Sair</button>
              )}
            </ul>
        </nav>
    </div>
  )
}

export default NavBar