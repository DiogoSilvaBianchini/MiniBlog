import React from 'react'
import { Link } from 'react-router-dom'
import style from './PostDetails.module.css'

const PostDetails = ({posts}) => {
  return (
    <div className={style.container}>
        <div className={style.post}>
            <img src={posts.img} alt={posts.title} />
        </div>
        
       <div className={style.infoPost}>
            <h3>{posts.title}</h3>            
            <div className={style.tags}>
                {posts.tags.map((e) => (
                    <p key={e}><span>#</span>{e}</p>
                ))}
            </div>     
            <p>Por: - {posts.createdBy}</p>
            <Link className='btn darkBtn' to={`/post/${posts.id}`}>Ler</Link>
       </div>
    </div>
  )
}

export default PostDetails