import {useContext, useEffect, useState, forwardRef} from 'react'
import { PostContext } from '../../contexts/PostContext';
import { FileUploader } from "react-drag-drop-files";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

const fileTypes = ["JPG", "PNG", "JPEG"];

const UpdatePostModal = forwardRef(() => {
    const {postState: {post},showUpdatePostModal, setShowUpdatePostModal, updatePost,setShowToast} = useContext(PostContext)

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [title, setTitle] = useState(post.title);
    const [id, setId] = useState(post.id);
    const [previewImage, setPreviewImage] = useState(post.image)
    useEffect(() => {
        setTitle(post.title)
        setId(post._id)
        setPreviewImage(post.image)
    }, [post])

    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview)
        }
    },[file])
    const handleChangeForm = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeImage = (e) => {
        const image = e
        image.preview = URL.createObjectURL(image)
        setFile(image);
        setFileName(image.name);
    };

    const handleClose = () => {
        setTitle('')
        setFile(null)
        setFileName('')
        setShowUpdatePostModal(false);
    };
    const onSubmitUpdatePostForm = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        if(file){
            formData.append("image", file);
            formData.append("fileName", fileName);
        }
        formData.append("title", title)
        formData.append("id", id)
        try {
            const {success, message} = await updatePost(formData)
            handleClose()
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
    <Dialog open={showUpdatePostModal} onClose={handleClose}>
        <DialogTitle sx={{textAlign: 'center', padding:'9px 0', fontSize: 16, lineHeight: '24px'}}>Cập nhật bài viết</DialogTitle>
        <Divider></Divider>
        <form onSubmit={onSubmitUpdatePostForm}>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name='title'
                id="title"
                label="Tiêu đề bài viết"
                type="text"
                fullWidth
                variant="standard"
                sx={{width:{xs: 250, md: 552}}}
                onChange={handleChangeForm}
                value={title}
            />
            <FileUploader classes="my-2 !min-w-[250px]" maxSize='5' label='Tải lên hoặc thả ảnh ngay vào đây' handleChange={handleChangeImage} onSizeError={(e) => console.log(e)} name="image" types={fileTypes} />
            { file ? <img className='w-full' src={file.preview} alt={file.name}></img> : <img className='w-full' src={previewImage.url} alt={title}></img>}
            </DialogContent>
            <DialogActions>
            <Button type='submit'>Cập nhật</Button>
            </DialogActions>
        </form>
      </Dialog>
  )
})

export default UpdatePostModal
