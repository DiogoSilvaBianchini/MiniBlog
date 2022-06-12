import React from 'react'
import PostDetails from '../../components/PostDetails/PostDetails'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments("posts", search)

  return (
    <div>
        <h2>Busca concluida.</h2>
        <div>
            {posts && posts.length === 0 && (
                <p>Nenhum post encontrado...</p>
            )}

            {posts && posts.map((posts) => (
                <PostDetails key={posts.id} posts={posts}/>
            ))}
        </div>
    </div>
    
  )
}

export default Search