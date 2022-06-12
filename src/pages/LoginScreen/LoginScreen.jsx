import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import style from './LoginScreen.module.css'

const LoginScreen = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const {login, error: AuthError, lodding} = useAuthentication()



    useEffect(() => {
        setError(AuthError)
    }, [AuthError])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            email,
            password
        }

        await login(data)
    } 
    return (
        <form onSubmit={handleSubmit} className={style.Containerform}>
            <h2>LOGIN</h2>
            <label>
                <span>E-mail:</span>
                <input 
                    type="text" 
                    name='email' 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="E-mail"
                />
            </label>
            <label>
                <span>Password</span>
                <input 
                    type="password" 
                    name='password' 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Senha"
                />
            </label>
            {!lodding && <button type="submit" className='btn outLine'>Entrar</button>}
            {lodding && <button type="submit" disabled className='btn darkBtn'>Aguarde</button>}
            <Link to="/register" className='btn darkBtn'>Registre-se</Link>
            {error && <p className="error">{error}</p>}
        </form>
    )
}

export default LoginScreen