import React, {useContext, useState} from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { AuthContext } from '../../contexts/AuthContext';
import { PostContext } from '../../contexts/PostContext';

export default function MenuSinglePost({id,idUserCmt, onDeleteComment}) {
    const {authState} = useContext(AuthContext)
    const {postState: {post}} = useContext(PostContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteComment = async(id) => {
        await onDeleteComment(id)
        handleClose()
    }
    return (
        <>
            <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
                <MoreHoriz fontSize='small'/>
            </IconButton>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            >
                {
                <MenuItem onClick={handleClose} disabled>Báo cáo (Develop)</MenuItem>
                }
                {
                (authState.user._id === idUserCmt || authState.user._id === post.user._id)  &&<MenuItem onClick={() => handleDeleteComment(id)}>Xóa</MenuItem>
                }
                {
                <MenuItem onClick={handleClose}>Hủy</MenuItem>
                }
            
            </Menu>
        </>
    )
}
