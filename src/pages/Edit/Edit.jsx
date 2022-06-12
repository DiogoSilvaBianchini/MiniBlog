import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert/Alert'
import { useAuthentication } from '../../hooks/useAuthentication'
import {useFetchDocument} from '../../hooks/useFetchDocument'
import style from './Edit.module.css'


const Edit = () => {
  const {id} = useParams()
  const {auth} = useAuthentication()
  const {documents: posts, lodding} = useFetchDocument("posts", id)
  const navigate = useNavigate()

  const [user,setUser] = useState(undefined)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])
  
  useEffect(() => {
    console.log(alert)
  },[alert])
  
  const warning = () => {
    setAlert(true)
  }

  return (
    <>
      {alert ? <Alert 
        message={"Deseja exluir esse post?"} 
        yes={"Deletar"} 
        no={"cancelar"}
        id={id}
        close={setAlert}
        />:(null)}
      {lodding && <p>Carregando dados...</p>}
      {posts && user.displayName === posts.createdBy ? 
        (
          <div className={style.container}>   
            <nav className={style.menu}>
              <h2>{posts.title}</h2>
              <div className={style.butons}>
                <button className='btn outLine' onClick={() => navigate("/post/edit/" + id)}>Editar</button>
                <button className='btn delete' onClick={warning}>x</button>
              </div>
            </nav>
            <img src={posts.img} alt="foto" />
            <p>{posts.body}</p>
            {posts.tags.length >= 0 ? posts.tags.map((tags) => (
              <p key={tags}><span>#</span>{tags}</p>
            )):(null)} 
          </div>
        ):(
          <>
            {!lodding && <h1>Por favor, não tente isso novamente...</h1>}        
          </>
        )}
    </>
  )
}

export default Edit

