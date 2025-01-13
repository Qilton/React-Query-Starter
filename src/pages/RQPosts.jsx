import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const RQPosts = () => {
    const fetchPosts=async()=>{
        const response=await axios.get("https://jsonplaceholder.typicode.com/posts")
        return response;
    }
  const {data,isLoading,isError,error,refetch,isFetching}= useQuery({
        queryKey:["posts"],
        queryFn:fetchPosts,
        enabled:false,
        
    })
    console.log({isLoading,isFetching})
    if(isLoading){
        return <div>Loading..</div>
    }
    if(isError){
        console.log(error);
        return <div>Error has occurred...</div>
    }
console.log(data)
  return (
    <>
     {data?.data.map(post => (
      <div className='post-item' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.content}</p>
        </div>
    ))}
    <button onClick={refetch}>CLick me</button>
    </>
  )
}

export default RQPosts
