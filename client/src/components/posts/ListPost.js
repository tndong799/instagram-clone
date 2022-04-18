import React, { useContext } from 'react'
import { ImageList, ImageListItem} from '@mui/material';
import { PostContext } from '../../contexts/PostContext';

export default function ListPost() {
    const {postState: {postsUser}} = useContext(PostContext)
    return (
        <ImageList sx={{ width: '100%', overflowY: 'unset',height: 'auto', gap:{xs:'3px !important', md:'20px !important'} }} cols={3}>
            {
                postsUser && postsUser.map((post) => (
                    <ImageListItem key={post.image.id} sx={{maxHeight: {xs: '100px', md: '252px'}}}>
                        <img
                            src={`${post.image.url}?w=252&h=252&fit=crop&auto=format`}
                            srcSet={`${post.image.url}?w=252&h=252&fit=crop&auto=format&dpr=2 2x`}
                            alt={post.title}
                            loading="lazy"
                            className='!max-h-full !h-full'
                        />  
                    </ImageListItem>
                ))
            }
        </ImageList>
    )
}
