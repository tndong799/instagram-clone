import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { PostContext } from '../../contexts/PostContext';
import AvatarUser from './AvatarUser';
import { styled } from '@mui/material/styles';
import { Modal, Button, Divider, ListItem, List } from '@mui/material'
import { CircularProgress } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    // border: '1px solid #a8a8a8',
    borderRadius: '8px',
    boxShadow: 24,
    p: 0,
    paddingTop: 2,
    width: 360,
    textAlign: 'center',
    maxWidth: '360px',
    overflow: 'hidden'
  };
    const styleListItem = {
        justifyContent: 'center',
        overflow: 'hidden'
    }
    const Input = styled('input')({
        display: 'none',
      });

export default function UpdateAvtModal() {
    const {authState: {user: {image, username, firstname, lastname}},openModalAvt,setOpenModalAvt, updateUser} = useContext(AuthContext)
    const { setShowToast} = useContext(PostContext)
    const [loading, setLoading] = useState(false)
    const handleCloseModalUpdateAvt = () => {
        setOpenModalAvt(false)
    }
    const handleImageSelected = async (e) => {
        setLoading(true)
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
        setLoading(false)
        handleCloseModalUpdateAvt()
    }
    const removeAvt = async (e) => {
        setLoading(true)
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
        setLoading(false)
        handleCloseModalUpdateAvt()
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
                <AvatarUser 
                    image={image} 
                    firstname={firstname} 
                    lastname={lastname} 
                    sizeImage={{height:'60px',width:'60px'}} 
                    sizeImageString={{height:'60px',width:'60px', fontSize: '30px'}} 
                />
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
            {  loading &&  <div className='absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-[#000000a8]'>
                    <CircularProgress />
                </div>}
        </List>
    </Modal>
  )
}
