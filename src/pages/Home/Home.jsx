import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import PostDetails from '../../components/PostDetails/PostDetails'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import style from './Home.module.css'
const Home = () => {

  const {documents: posts, lodding} = useFetchDocuments("posts")
  const [query, setQuerry] = useState("")

  const Navigate = useNavigate()

  const searchContent = (e) => {
    e.preventDefault()

    if(query){
      return Navigate(`/search?q=${query}`)
    }
  }
  return (
    <div className={style.container}>
      {lodding && <p>Carregando dados</p>}
     <div className={style.search}>
        <form onSubmit={searchContent}>
          <h2>Procurando por conteudos expecificios?</h2>
          <label>
            <input 
              type="text" 
              name="search" 
              placeholder='Procure por tag' 
              onChange={(e) => setQuerry(e.target.value)}
              />
            <button type='submit' className='btn darkBtn' >Procurar</button>
          </label>
        </form>
      </div>
      {!posts && (
        <div className={style.noPost}>
          <h2>Ninguém postou nada ainda... <br/></h2>
          <h3>Seja o primeiro</h3>
          <Link to="/post/create" className='btn'>+ Criar primeiro post</Link>
        </div>
      )}
      {posts && posts.map((e, i) => (
        <PostDetails key={i} posts={e}/>
      ))}
    </div>
  )
}

export default Home