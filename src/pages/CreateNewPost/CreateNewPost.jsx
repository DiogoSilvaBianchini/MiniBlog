import React, {useState} from 'react'

import { useInsertDocument } from '../../hooks/useInsertDocument'
import {useAuthValue} from '../../context/AuthContext'

import style from './CreateNewPost.module.css'
import { useNavigate } from 'react-router-dom'

const CreateNewPost = () => {
  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [formError, setFormError] = useState(null)
  const { insertDocument, response } = useInsertDocument("posts")

  const {user} = useAuthValue()
  
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")
    

    //Validação de campos
    if(!title || !img || !body || !tags ){
      formError("Por favor, preencha todos os Campos")
    }

    // tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    try { 
      new URL(img)     
    } catch (error) {
      setFormError("A imagem não é valida")
    }

    if(formError) return;

    insertDocument({
      title,
      img,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    navigate("/")
  }


  return (
    <div className={style.Containerform}>
        <h1>Crie um novo post</h1>
        <p>Compartilhe um fragmento da sua mente...</p>

        <form onSubmit={handleSubmit}>
          <label>
              <span>Titulo:</span>
              <input type="text" 
              required 
              name="title" 
              placeholder="Digite um titulo legal..." 
              onChange={(e) => setTitle(e.target.value)} 
              value={title}/>
          </label>
          <label>
              <span>Imagem:</span>
              <input type="text" 
              required 
              name="image" 
              placeholder="URL" 
              onChange={(e) => {
                setImg(e.target.value)
                
                }} 
              value={img}/>
          </label>
          <label>
              <span>Post:</span>
              <textarea name="body" 
              required 
              placeholder='Digite sobre o post...' 
              onChange={(e) => setBody(e.target.value)} 
              value={body}/>
          </label>
          <label>
              <span>Tags:</span>
              <input type="text" 
              required 
              name="tags" 
              placeholder="Insira as tags por virgula" 
              onChange={(e) => setTags(e.target.value)} 
              value={tags}/>
          </label>
          {!response.lodding && <button type='submit' className="btn">Enviar</button>}
          {response.lodding && (<button type='submit' className="btn disabled" disabled >Aguarde...</button>)}
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}
        </form>
          

        {img && <img src={img} alt="preview" className={style.preview}/>}
    </div>
  )
}

export default CreateNewPost