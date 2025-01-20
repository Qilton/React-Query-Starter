import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const PostDetails = () => {
    const postId=useParams().postId
    const fetchPosts = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        return response.data;
      };
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["posts",postId],
    queryFn: fetchPosts,
  });
  console.log(data)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    console.log(error)
    return <div>Error has occurred...</div>
  }
  return (
    <div>
      <div className="post-list">
      <h1>{data.title}</h1>
      <h2>{data.body}</h2>
      </div>
    </div>
  )
}

export default PostDetails
