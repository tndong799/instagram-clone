import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { PostContext } from '../../contexts/PostContext';
import { styled } from '@mui/material/styles';
import { Avatar, Modal, Button, Divider, ListItem, List } from '@mui/material'
import { stringAvatar } from '../../utils/setMui'

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
    paddingTop: 2,
    width: 360,
    textAlign: 'center',
    maxWidth: '360px'
  };
    const styleListItem = {
        justifyContent: 'center'
    }
    const Input = styled('input')({
        display: 'none',
      });

export default function UpdateAvtModal() {
    const {authState: {user: {image, username, firstname, lastname}},openModalAvt,setOpenModalAvt, updateUser} = useContext(AuthContext)
    const { setShowToast} = useContext(PostContext)
    const handleCloseModalUpdateAvt = () => {
        setOpenModalAvt(false)
    }
    const handleImageSelected = async (e) => {
        const image = e.target.files[0]
        if (!image) {
            setShowToast({
                show: true,
                message: 'Chọn Image'
            })
            return false;
            }
        if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
            setShowToast({
                show: true,
                message: 'Chọn ảnh hợp lệ'
            })
            return false;
        }
        const formData = new FormData();
        formData.append("username", username)
        formData.append("image", image);
        formData.append("fileName", image.name);
        try {
            const {success, message} = await updateUser(formData)
            handleCloseModalUpdateAvt()
            setShowToast({
                show: true,
                message,
                type: success
            })
        } catch (error) {
            console.log(error)
        }

    }
    const removeAvt = async (e) => {
        const formData = new FormData();
        formData.append('action','remove_avt')
        try {
            const {success, message} = await updateUser(formData)
            handleCloseModalUpdateAvt()
            setShowToast({
                show: true,
                message,
                type: success
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Modal
            open={openModalAvt}
            onClose={handleCloseModalUpdateAvt}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <List sx={style}>
                <ListItem sx={styleListItem}>
                    {image 
                        ? <Avatar alt={firstname+' '+lastname} src={image.url} sx={{height:'60px',width:'60px'}}/> 
                        : <Avatar {...stringAvatar(firstname+' '+lastname)} sx={{height:'60px',width:'60px', fontSize: 30}}/>}
                </ListItem>
                <Divider></Divider>
                <ListItem sx={styleListItem}>
                    <label htmlFor="contained-button-file">
                        <Input onChange={handleImageSelected} sx={{display: 'none'}} accept="image/*" id="contained-button-file" type="file" />
                        <Button component="span" sx={{textTransform: 'none'}}>
                        Tải ảnh lên
                        </Button>
                    </label>
                </ListItem>
                <Divider></Divider>
                <ListItem sx={styleListItem}>
                    <Button color='error' onClick={removeAvt} sx={{textTransform: 'none'}}>Gỡ ảnh hiện tại</Button>    
                </ListItem>
                <Divider></Divider>
                <ListItem sx={styleListItem}>
                    <Button sx={{color: '#262626', textTransform: 'none'}} onClick={handleCloseModalUpdateAvt}>Hủy</Button>
                </ListItem>
            </List>
        </Modal>
  )
}
