import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import moment from 'moment';

import { PostContext } from '../../contexts/PostContext'
import { AuthContext } from '../../contexts/AuthContext';
import { CommentContext } from '../../contexts/CommentContext';

import AvatarUser from '../auth/AvatarUser';
import CommentInput from './CommentInput';

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import Menu from '@mui/material/Menu';
import { MenuItem, ListItemIcon } from '@mui/material';
import MenuSinglePost from './MenuSinglePost';
import { Link } from 'react-router-dom';

function PostModal() {
    const modalRef = useRef()
    const {postState: {post, likes},deleteLikePost, likePost, showPostModal,setShowToast, setShowPostModal, deletePost, findPost, setShowUpdatePostModal} = useContext(PostContext)
    const {commentState: {commentOfPost}, deleteComment} = useContext(CommentContext)
    const {authState} = useContext(AuthContext)
    const [size, setSize] = useState({
        width: (window.innerHeight - 64) * 1327 / 1505,
        height: window.innerHeight - 64
    })
    const [liked, setLiked] = useState(false)
    const [countLike, setCountLike] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        return () => {
            handleClose()
        }
    },[])


    useEffect(() => {
        likes.forEach(like => {
            if(like.post === post._id && like.user === authState.user._id){
                setLiked(true)
                return
            }
        })
        setCountLike(likes.filter(like => {
            return like.post === post._id
        }).length)
    },[])
    useEffect(() => {
        const handleResize = (e) => {
            setSize({
                width: (window.innerHeight - 64) * 1327 / 1505,
                height: window.innerHeight - 64
            })
        }
        window.addEventListener('resize',handleResize)

        return () => {window.removeEventListener('resize', handleResize);}
    },[])
    const handleClose = () => {
        setShowPostModal(false)
    }
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
    const handleDeletePost = async (id) => {
        const { message, success } = await deletePost(id);
        setShowToast({show: true, message, type: success});
        handleCloseMenu()
        handleClose()
    }
    const handleShowUpdatePost = (id) => {
        findPost(id)
        setShowUpdatePostModal(true)
        handleCloseMenu()
        // handleClose()
    }
    const handleDeleteComment = async (id) => {
        const {message, success} = await deleteComment(id)
        setShowToast({show: true, message, type: success});
    }

    return (
    <Dialog ref={modalRef} open={showPostModal} onClose={handleClose} maxWidth='lg'>
        <div className='flex flex-row items-stretch h-full'>
            <div  style={{maxHeight: `${size.height}px`, maxWidth: `${size.width}px`, aspectRatio: '1327/1505', flexBasis: `${size.width}px`}}>
                <img src={post.image.url} alt={post.title} className='w-full h-full object-cover'/>
            </div>
            <div className='w-[500px] rounded-r-sm bg-[#fff] pointer-events-auto flex flex-col flex-[1_1_auto]'>
                <div className='border-l border-b border-solid border-[#efefef] flex justify-between items-center'>
                    <div className='p-[14px_4px_14px_16px] flex items-center justify-start max-w-[calc(100%-48px)] grow shrink'>
                        <Link to={`/${post.user.username}`}>
                            <AvatarUser 
                                image={post.user.image} 
                                firstname={post.user.firstname} 
                                lastname={post.user.lastname}
                                sizeImage={{width: '32px', height: '32px'}} 
                                sizeImageString={{width: '32px', height: '32px', fontSize: '18px'}}
                            />
                        </Link>
                        <div className='ml-[14px] flex justify-start grow shrink items-center text-[#262626] text-[14px] font-semibold leading-[18px]'>
                            <Link to={`/${post.user.username}`}>{post.user.username}</Link>
                        </div>        
                    </div>
                    <div>
                        <IconButton onClick={handleClick}>
                            <MoreHoriz />
                        </IconButton>
                    </div>
                    <Menu
                            id="menu-modal-post"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                            authState.user._id === post.user._id && <MenuItem onClick={handleShowUpdatePost.bind(this,post._id)}><ListItemIcon><EditOutlinedIcon /></ListItemIcon>Sửa</MenuItem>
                            }
                            {
                            authState.user._id === post.user._id &&<MenuItem onClick={handleDeletePost.bind(this,post._id)}><ListItemIcon><DeleteOutlineOutlinedIcon /></ListItemIcon>Xóa</MenuItem>
                            }
                            {
                            authState.user._id !== post.user._id && <MenuItem onClick={handleClose} disabled><ListItemIcon><ReportProblemOutlinedIcon /></ListItemIcon>Báo cáo (Develop)</MenuItem>
                            }
                            
                        </Menu>
                </div>
                <div className='flex flex-col border-l border-solid border-[#efefef] grow'>
                    <div className='order-2 px-2 py-2 mt-1 border-t border-solid border-[#efefef]'>
                        <IconButton aria-label="add to favorites" onClick={() => handleLikePost(post._id, liked)}>
                        { !liked ? <FavoriteBorderOutlinedIcon fontSize='medium' /> : <FavoriteIcon sx={{color: '#ed4956'}}></FavoriteIcon>}
                        </IconButton>
                    </div>
                    <div className='text-[#262626] font-sm font-semibold text-sm leading-[18px] mb-2 order-3 px-4'>
                        {countLike !== 0 ? `${countLike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} lượt thích` : ''} 
                    </div>
                    <div className='overflow-auto overflow-x-hidden flex flex-col order-1 grow shrink min-h-0 relative'>
                        <div className='box-content h-[100%] overflow-y-scroll grow absolute left-0 w-full'>
                            <div className='p-[14px_4px_14px_16px] flex items-start justify-start max-w-[calc(100%-48px)]'>
                                <Link to={`/${post.user.username}`}>
                                    <AvatarUser 
                                        image={post.user.image} 
                                        firstname={post.user.firstname} 
                                        lastname={post.user.lastname}
                                        sizeImage={{width: '32px', height: '32px'}} 
                                        sizeImageString={{width: '32px', height: '32px', fontSize: '18px'}}
                                    />
                                </Link>
                                <div className='ml-[14px] flex flex-col justify-between text-[#262626] text-[14px] font-semibold leading-[18px]'>
                                    <div>
                                    <Link to={`/${post.user.username}`}><span>{post.user.username}</span></Link><span className='ml-[14px] text-[14px] leading-[18px] font-normal'> {post.title}</span>
                                    </div>
                                    <div className='text-[10px] text-[#8e8e8e] leading-[12px] font-normal mt-4 '>
                                        {moment.utc(post.createAt).local().fromNow()}
                                    </div>
                                </div>
                            </div>
                            { commentOfPost && commentOfPost.length > 0 
                            ? commentOfPost.map((cmt, index) => {
                                return (
                                    <div key={index} className='group p-[14px_4px_14px_16px] flex items-start justify-start max-w-[calc(100%-48px)]'>
                                        <Link to={`/${cmt.user.username}`}>
                                            <AvatarUser 
                                                image={cmt.user.image} 
                                                firstname={cmt.user.firstname} 
                                                lastname={cmt.user.lastname}
                                                sizeImage={{width: '32px', height: '32px'}} 
                                                sizeImageString={{width: '32px', height: '32px', fontSize: '18px'}}
                                            />
                                        </Link>
                                        <div className='ml-[14px] flex flex-col justify-between text-[#262626] text-[14px] font-semibold leading-[18px]'>
                                            <div>
                                            <Link to={`/${cmt.user.username}`}><span>{cmt.user.username}</span></Link><span className='ml-[14px] text-[14px] leading-[18px] font-normal'> {cmt.title}</span>
                                            </div>
                                            <div className='text-[10px] flex text-[#8e8e8e] leading-[12px] font-normal items-center my-3 group-hover:my-0 '>
                                                {moment.utc(cmt.createAt).local().fromNow()}
                                                <div className='ml-2 hidden group-hover:block'>
                                                    <MenuSinglePost id={cmt._id} idUserCmt={cmt.user._id} onDeleteComment={handleDeleteComment} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : ''
                            }
                        </div>
                    </div>
                    <div className='order-4 px-4 text-[10px] text-[#8e8e8e] leading-[12px] font-normal uppercase'>
                        {moment.utc(post.createAt).local().fromNow()}
                    </div>
                    <div className='order-5 mt-3.5'>
                        <CommentInput postId={post._id}></CommentInput>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
  )
}

export default memo(PostModal)