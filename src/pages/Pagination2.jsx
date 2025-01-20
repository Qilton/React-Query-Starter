import React,{useState} from 'react'
import axios from 'axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
const Pagination2 = () => {
    const fetchPosts = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
        return response;
      };
    const[page,setPage]=useState(1)
    const { data, isLoading, isError, error,isFetching} = useQuery({
        queryKey: ['posts',page],
        queryFn: fetchPosts,
        placeholderData:keepPreviousData
      });

      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        console.error(error);
        return <div>Error has occurred...</div>;
      }

  return (
    <div>
       {data?.data.map(post => (
      <div className='post-item' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.body}</p>
        </div>
    ))}
    <button onClick={()=>setPage(page-1)} disabled={isLoading}>Previous Page</button>
    <button onClick={()=>setPage(page+1) } disabled={isLoading}>Next Page</button>
    </div>
  )
}

export default Pagination2
