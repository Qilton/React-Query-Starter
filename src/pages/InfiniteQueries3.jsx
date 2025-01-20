import axios from "axios";
import React from 'react'
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
const InfiniteQueries3 = () => {

    const{ref,inView}=useInView()
    const {data,isFetchingNextPage,hasNextPage,fetchNextPage,isLoading,isError}=useInfiniteQuery({
        queryKey:['posts'],
        queryFn:({pageParam=1})=>{
            return axios.get(`https://jsonplaceholder.typicode.com/posts/?_limit=10&_page=${pageParam}`)
        },
        getNextPageParam:(lastPage,allPages)=>{
         
               if(lastPage.data.length<10){
                return undefined
               }
               console.log(allPages)
               return allPages.length+1
            
        }
    })
    // console.log(data)
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error has occured..</div>
    }
    if(inView && hasNextPage){
        fetchNextPage()
    }
  return (
    <div>
        {data.pages.map((page)=>{
            return page.data.map((post)=>{
                return <div key={post.id} className='post-item'>
                    <h3 className='post-title'>{post.title}</h3>
                    <p className='post-body'>{post.body}</p>
                </div>
            })
        })}

       <div ref={ref}>{isFetchingNextPage && "Loading.."}</div>
    </div>
  )
}

export default InfiniteQueries3
