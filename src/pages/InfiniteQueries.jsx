import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

const InfiniteQueries = () => {
  const {  data, isLoading, isError, error,fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => {
      return axios.get(
        `https://jsonplaceholder.typicode.com/posts/?_limit=10&_page=${pageParam}`
      )
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < 4) {
        return undefined
      }
      return allPages.length + 1
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      {data?.pages.map((page) => (
        page.data.map((post) => (
          <div className='post-item' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.body}</p>
          </div>
        ))
      ))}

      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load More
      </button>

      {!hasNextPage && <div>No more posts</div>}
    </div>
  )
}

export default InfiniteQueries
