import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:3000/posts');
    return response;
  };

const ReactQueryPosts = () => {
    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
      });
    console.log({isLoading,isFetching})
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        console.log(error)
        return <div>Error has occurred...</div>
    }
  return (
    <div>
       <div className="post-list">
                {data?.data.map(post => (
                    <div key={post.id} className="post-item">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-body">{post.content}</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default ReactQueryPosts
