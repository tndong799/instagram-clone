import { memo, useContext, useEffect } from "react"
import { PostContext } from "../contexts/PostContext"
import { AuthContext } from "../contexts/AuthContext";
import { CommentContext } from "../contexts/CommentContext";


import { Container,CircularProgress,} from "@mui/material"

import NoPostCard from "../components/posts/NoPostCard";
import SinglePost from "../components/posts/SinglePost";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import PostModal from "../components/posts/PostModal";


function Home() {
    const { postState: {postLoading, posts,likes, post}, loadedPosts, deleteLikePost, likePost } = useContext(PostContext);
    const {authState} = useContext(AuthContext)
    const {commentState:{comments}, getComments} = useContext(CommentContext)
    useEffect(() => {
      const loaded = async() => {
        await loadedPosts()
        await getComments()
      }
      loaded();
    },[])
    const handleLikePost = async (id,status) => {
      try {
        if(status){
            await deleteLikePost(id)
        }else{
            await likePost(id)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <Container maxWidth='md' className="mt-5 mb-10">
      {postLoading ? <div className='flex justify-center mt-6'>
                        <CircularProgress />
                      </div>
                    : posts.length === 0 ? <NoPostCard></NoPostCard>
                                        : posts.map((post, index) => {
                                          const countComment = comments.filter(cmt => {
                                            return cmt.post === post._id
                                          }).length
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
                                          return (<SinglePost key={index} onHandleLikePost={handleLikePost} liked={liked} countLike={countLike} post={post} countComment={countComment}></SinglePost>)
                                        })
      }
      {post !== null && <UpdatePostModal></UpdatePostModal>}
      {post !== null && <PostModal></PostModal>}
    </Container>
  )
}
export default memo(Home)