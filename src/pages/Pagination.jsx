import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Pagination = () => {
  const [page, setPage] = useState(1);

  const fetchPosts = async () => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=4&_page=${page}`);
    return response;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', page],
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
      <div className="post-list">
        {data?.data.map((post) => (
          <div key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.content}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev Page
      </button>
      <button onClick={() => setPage(page + 1)} disabled={data?.data.length < 4}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
