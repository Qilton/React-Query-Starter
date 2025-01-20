import React,{useEffect} from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import {useInView} from 'react-intersection-observer'


const InfiniteQueries2 = () => {
    const { ref, inView } = useInView();
  const {data,isLoading, isError,error,  fetchNextPage,  hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => {
      return axios.get(
        `https://jsonplaceholder.typicode.com/posts/?_limit=10&_page=${pageParam}`
      )
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage)
      if (lastPage.data.length < 10) {
        return undefined
      }
      return allPages.length + 1
    },
  })

  useEffect(()=>{
    if(inView && hasNextPage){
      fetchNextPage()
    }
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

<div ref={ref}>{isFetchingNextPage && "Loading..."}</div>

    
      {!hasNextPage && <div>No more posts</div>}
    </div>
  )
}

export default InfiniteQueries2
