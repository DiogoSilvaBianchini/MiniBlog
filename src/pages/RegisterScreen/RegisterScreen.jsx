import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication';
import style from './RegisterScreen.module.css'

const RegisterScreen = () => {
  const [displayName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {createUser, error: AuthErro, lodding} = useAuthentication();
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password !== ConfirmPassword){
      setError("As senhas não conferem")
      return
    }
    
    const user = {
        displayName,
        email,
        password
    }

    await createUser(user)
    setError("")
  }

  useEffect(() => {
    setError(AuthErro)
  }, [AuthErro])

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h1>Bem-vindo</h1>
      <p>Registre-se</p>
      <label>
        <span>Nome:</span>
        <input 
          type="text" 
          required 
          name='displayName' 
          placeholder='Digite seu nome'
          value={displayName}
          onChange={(e) => setName(e.target.value)}
          />
      </label>
      <label>
        <span>E-mail:</span>
        <input 
          type="email" 
          required 
          name='email' 
          placeholder='Digite seu E-mail favorito'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          />
      </label>
      <label>
        <span>Senha:</span>
        <input 
          type="password" 
          required 
          name='password' 
          placeholder='Digite sua melhor senha'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          />
      </label>
      <label>
        <span>Confirme sua senha:</span>
        <input 
          type="password" 
          required 
          name='ConfirmPassword' 
          placeholder='Confirm sua senha'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={ConfirmPassword}
          />
      </label>
      {!lodding && <button type='submit' className='btn outLine'>Registrar-se</button>}
      {lodding && <button type='submit' disabled className='btn outLine'>Aguarde...</button>}
      <Link to="/login" className='btn darkBtn'>Já possuo conta</Link>
      {error && <p className='error'>{error}</p>}
    </form>
  )
}

export default RegisterScreen