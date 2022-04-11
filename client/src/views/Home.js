import { useContext, useEffect } from "react"
import { PostContext } from "../contexts/PostContext"
import { AuthContext } from "../contexts/AuthContext";


import { Container,CircularProgress,} from "@mui/material"

import NoPostCard from "../components/posts/NoPostCard";
import SinglePost from "../components/posts/SinglePost";



export default function Home() {
    const { postState: {postLoading, posts,likes}, loadedPosts, deleteLikePost, likePost } = useContext(PostContext);
    const {authState} = useContext(AuthContext)
    useEffect(() => {
      const loaded = async() => {
        await loadedPosts()
      }
      loaded();
    },[])
    const handleLikePost = async (id,status) => {
      try {
        if(status){
          const res = await deleteLikePost(id)
        }else{
          const res = await likePost(id)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <Container maxWidth='md' className="mt-5 mb-10">
      {postLoading ? <div className='flex justify-center mt-6'>
                        <CircularProgress color='secondary' />
                      </div>
                    : posts.length === 0 ? <NoPostCard></NoPostCard>
                                        : posts.map((post, index) => {
                                          const countLike = likes.filter(like => {
                                            return like.post === post._id
                                          }).length
                                          let liked = false
                                          likes.forEach(like => {
                                            if(like.post === post._id && like.user === authState.user._id){
                                              liked = true
                                              return
                                            }
                                          })
                                          return (<SinglePost key={index} onHandleLikePost={handleLikePost} liked={liked} countLike={countLike} post={post}></SinglePost>)
                                        })
      }
    </Container>
  )
}
