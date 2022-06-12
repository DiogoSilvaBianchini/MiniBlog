import React from 'react'
import { Link } from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import {useFetchDocuments} from '../../hooks/useFetchDocuments'
import style from './Dashbord.module.css'

const Dashbord = () => {
  const {user} = useAuthValue();
  const uid = user.uid
  const {documents: posts} = useFetchDocuments("posts", null, uid)

  return (
    <>    
      {
        posts && posts.length === 0 ? 
        (
          <div className={style.containerNoPost}>
            <p className='noPost'>Você ainda não postou nada...</p>
            <Link to="/post/create" className='btn'>Criar post</Link>
          </div>
        ):(
          <div className={style.container}>
            <div className={style.info}>
              <h2>Seus posts</h2>
            </div>
          
            <div className={style.conteudo}>
              {posts && posts.map((post) => (
                <div key={post.id}>
                  <Link to={`/edit/${post.id}`}>
                    <img src={post.img} alt="fotos" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </>

  )
}

export default Dashbord