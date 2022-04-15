import {memo} from 'react'
import { stringAvatar } from '../../utils/setMui'
import Avatar from '@mui/material/Avatar';


function AvatarUser({image, firstname, lastname, sizeImage, sizeImageString}) {
  return (
    image 
        ? <Avatar alt={firstname+' '+lastname} src={image.url} sx={sizeImage}/> 
        : <Avatar {...stringAvatar(firstname+' '+lastname)} sx={sizeImageString}/>
  )
}
export default memo(AvatarUser)