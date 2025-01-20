import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import "../App.css";

const RQ = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response;
  };

  const addPost = (newPost) => {
    return axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  };

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { mutate: addPostMutation } = useMutation({
    mutationFn: addPost,
    // onSuccess:(newData)=>{
    //   // queryClient.invalidateQueries("posts")
    //   queryClient.setQueriesData(["posts"],(oldQueryData)=>{
    //     return {data:[...oldQueryData.data,newData.data]}
    //   })

    // }
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);
      const previousPostData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { ...newPost, id: String(oldQueryData?.data?.length + 1) }]
        }
      })

      return {
        previousPostData
      }
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["posts"], context.previousPostData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      alert("Both title and body are required!");
      return;
    }
    const newPost = { title, body };
    addPostMutation(newPost);
    setTitle('');
    setBody('');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
        <button type="submit">Post</button>
      </form>
      <button onClick={refetch}>fetch posts</button>
      {isFetching && <div>Updating posts...</div>}

      {data?.data.map((post) => (
        <Link to={`/react-query-post/${post.id}`} key={post.id}>
          <div className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default RQ;
