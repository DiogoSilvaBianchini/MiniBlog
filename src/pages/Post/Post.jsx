import React from 'react'
import {useParams} from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import style from './Post.module.css'
import {useNavigate} from 'react-router-dom'

const Post = () => {
    const {id} = useParams()
    const {documents: post} = useFetchDocument("posts", id)
    const navigate = useNavigate()
    const returnHome = () => {
        navigate("/")
    }
  return (
    <div className={style.containerPost}>
        {
            post && (
                <>
                    <div className={style.top}>
                        <h1>{post.title}</h1>
                        <button className='btn darkBtn' onClick={returnHome}>Voltar</button>
                    </div>
                    <img src={post.img} alt="Foto"/>
                    <div className={post.info}>
                        <p>{post.body}</p>
                        <h3>Esse post trata sobre:</h3>
                        <div className={style.tags}>
                            {post.tags.map((tags) => (
                                <p key={tags}><span>#</span>{tags}</p>
                            ))}
                        </div>
                    </div>              
                </>
            )
        }
    </div>
  )
}

export default Post