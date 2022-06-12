import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import style from './EditPost.module.css'

const EditPost = () => {
  const {id} =  useParams()
  const {auth} = useAuthentication()
  const {documents: posts, lodding} = useFetchDocument("posts", id)
  const {UpdatedDoc} = useUpdateDocument()
  const [user,setUser] = useState(undefined)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])


  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")

  useEffect(() => {
    if(posts){
      setTitle(posts.title)
      setUrl(posts.img)
      setBody(posts.body)

      const textArray = posts.tags.join(", ")

      setTags(textArray)
    }
  },[posts])

  const handdleSubmit = (e) => {
    e.preventDefault()
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    const data = {
      title: title,
      img: url,
      body: body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    UpdatedDoc("posts", data, id)
  }
  return (
    <>
      {lodding && <p>Carregando dados...</p>}
      {posts && user.displayName === posts.createdBy ? (
        <div className={style.container}>
          <h1>Edite seu post!</h1>
          <form onSubmit={handdleSubmit}>
            <label>
              <span>Título</span>
              <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
            </label>
            <label>
              <span>Imagem</span>
              <input type="text" onChange={(e) => setUrl(e.target.value)} value={url}/>
            </label>
            {posts && 
            <>
              <p>Pré-visualização</p>
              <img className={style.img} src={!url ? posts.img: url} alt={url}/>
            </>
            }
            <label>
              <span>Post</span>
              <textarea onChange={(e) => setBody(e.target.value)} value={body}/>
            </label>
            <label>
              <span>Tags</span>
              <input type="text" onChange={(e) => setTags(e.target.value)} value={tags}/>
            </label>
            <button className='btn' type="submit">Editar</button>
            <Link className="btn darkBtn" to="/dashbord">Cancelar</Link>
          </form>
      </div>
      ):(
          <>
            {
              <h1>Por favor, não tente isso novamente...</h1>
              }
          </>
        )
    }
    </>  
  )
}

export default EditPost

