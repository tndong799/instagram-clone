import { Button, Divider, List, ListItem, Modal } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #a8a8a8',
    borderRadius: '8px',
    boxShadow: 24,
    p: 0,
    // paddingTop: 2,
    width: 360,
    textAlign: 'center',
    maxWidth: '360px'
  };
    const styleListItem = {
        justifyContent: 'center'
    }

export default function UpdateUserModal() {
    const {openModalUser, setOpenModalUser, logoutUser} = useContext(AuthContext)
    const naviagate = useNavigate()
    const handleCloseModalUpdateUser = () => {
        setOpenModalUser(false)
    }
    const handleLogoutUser = () => {
        logoutUser()
        handleCloseModalUpdateUser()
    }
    const handleUrlPassword = () => {
        naviagate('/account/password/change')
        handleCloseModalUpdateUser()
    }
  return (
    <Modal
            open={openModalUser}
            onClose={handleCloseModalUpdateUser}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <List sx={style}>
                <ListItem sx={styleListItem} onClick={handleUrlPassword}>
                    <Button sx={{textTransform: 'none'}}>Đổi mật khẩu</Button>
                </ListItem>
                <Divider></Divider>
                <ListItem sx={styleListItem}>
                    <Button color='error' sx={{textTransform: 'none'}} onClick={handleLogoutUser}>Đăng xuất</Button>    
                </ListItem>
                <Divider></Divider>
                <ListItem sx={styleListItem}>
                    <Button sx={{color: '#262626', textTransform: 'none'}} onClick={handleCloseModalUpdateUser}>Hủy</Button>
                </ListItem>
            </List>
        </Modal>
  )
}
