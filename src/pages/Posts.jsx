import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios"
import "../App.css"
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setPosts(response.data);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])


    if (isLoading) {
        return <div>Page is loading...</div>
    }

    if (isError) {
        return <div>Error has occurred...</div>
    }
  return (
    <div className='post-list'>
    {posts.map(post => (
      <div className='post-item' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.content}</p>
        </div>
    ))}
</div>
  ) 
}

export default Posts
