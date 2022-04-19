import React, { useContext } from 'react'
import { ImageList, ImageListItem} from '@mui/material';
import { PostContext } from '../../contexts/PostContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { CommentContext } from '../../contexts/CommentContext';

export default function ListPost() {
    const {postState: {post,postsUser, likes}, findPost, setShowPostModal} = useContext(PostContext)
    const {commentState:{comments}} = useContext(CommentContext)
    const handleShowModal = (id) => {
        findPost(id)
        setShowPostModal(true)
    }
    return (
        <ImageList sx={{ width: '100%', overflowY: 'unset',height: 'auto', gap:{xs:'3px !important', md:'20px !important'} }} cols={3}>
            {
                postsUser && postsUser.map((post) => {
                    const countComment = comments.filter(cmt => {
                        return cmt.post === post._id
                    }).length
                    const countLike = likes.filter(like => {
                    return like.post === post._id
                    }).length
                    
                    return (
                    <ImageListItem onClick={handleShowModal.bind(this,post._id)} className='group relative cursor-pointer' key={post.image.id} sx={{maxHeight: {xs: '100px', md: '252px'}}}>
                        <img
                            src={`${post.image.url}?w=252&h=252&fit=crop&auto=format`}
                            srcSet={`${post.image.url}?w=252&h=252&fit=crop&auto=format&dpr=2 2x`}
                            alt={post.title}
                            loading="lazy"
                            className='!max-h-full !h-full'
                        />
                        <div className='absolute top-0 left-0 w-full h-full bg-[#00000080] items-center justify-center hidden group-hover:flex transition'>
                            <div className='flex text-[#fff] text-base font-semibold'>
                                <div><FavoriteIcon color='inherit' fontSize='medium' /><span className='ml-1.5'>{countLike}</span></div>
                                <div className='ml-8'><ModeCommentIcon color='inherit' fontSize='medium' /><span className='ml-1.5'>{countComment}</span></div>
                            </div>
                        </div>
                    </ImageListItem>
                )})
            }
        </ImageList>
    )
}
