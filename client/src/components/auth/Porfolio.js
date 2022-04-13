import {useContext,useEffect, useRef} from 'react'
import UpdateUserModal from './UpdateUserModal'
import { AuthContext } from '../../contexts/AuthContext'
import { stringAvatar } from '../../utils/setMui'

import { IconButton,Avatar } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';

import { PostContext } from '../../contexts/PostContext';
import { Link } from 'react-router-dom'


export default function Porfolio() {
    const {authState: {porfolioUser: {image, username, firstname, lastname}, user}, setOpenModalAvt, setOpenModalUser} = useContext(AuthContext)
    const {postState: {postsUser, likes} } = useContext(PostContext)

    const handleShowModalUpdateAvt = () => {
        if(username === user.username){
            setOpenModalAvt(true)
        }
    }
    const handleShowModalUpdateUser = () => {
        if(username === user.username){
            setOpenModalUser(true)
        }
    }
    
  return (
    <div className='mb-11 flex'>
        <div className='mr-7.5 grow basis-0 '>
            <div className='md:h-40 md:w-40   block mx-auto xs:h-[77px] xs:w-[77px]'>
                <div className='bg-[#fafafa] rounded-full overflow-hidden relative w-full h-full'>
                    <IconButton sx={{padding: 0}} onClick={handleShowModalUpdateAvt}>
                        {image 
                        ? <Avatar alt={firstname+' '+lastname} src={image.url} sx={{height:{ xs: '77px', md: '160px'},width:{ xs: '77px', md: '160px'}}}/> 
                        : <Avatar {...stringAvatar(firstname+' '+lastname)} sx={{height:{ xs: '77px', md: '160px'},width:{ xs: '77px', md: '160px'}, fontSize:{xs: 40, md: 80}}}/>}
                    </IconButton>
                </div>
            </div>
        </div>
        <div className='text-[#262626] flex-shrink grow-[2] basis-[30px]'>
            <div className='mb-5 flex items-center shrink flex-row xs:flex-wrap'>
                <h2 className='text-[#262626] block overflow-hidden text-ellipsis font-light md:text-[28px] md:leading-9 xs:text-base'>{username}</h2>
                {
                    username === user.username 
                    && <div className='ml-5 flex flex-[0_1_auto] justify-start items-stretch xs:order-last xs:ml-0'>
                        <div className='flex-[1_1_auto] flex justify-start items-stretch'>
                            <Link to='/account/edit' className='border border-solid border-[#dbdbdb] text-[#262626] rounded p-[5px_9px] text-[14px] font-semibold leading-[18px]'>Chỉnh sửa trang cá nhân</Link>
                        </div>
                    </div>
                }
                {username === user.username && <IconButton sx={{marginLeft: '10px'}} onClick={handleShowModalUpdateUser}>
                    <SettingsIcon/>
                </IconButton>}
                
            </div>
            <div className='mb-5 flex flex-row list-none'>
                <li className='text-base mr-10'><span className='font-semibold'>{postsUser.length}</span> bài viết</li>
                <li className='text-base mr-10'><span className='font-semibold'>
                    {
                        likes.filter(like => {
                            return postsUser.find(({_id}) => like.post === _id)
                        }).length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    </span> lượt thích</li>
                <li className='text-base'></li>
            </div>
            <div className='block'>
                <span className='font-semibold text-base leading-6'>{firstname + ' ' + lastname}</span>
            </div>
        </div>
        
        <UpdateUserModal></UpdateUserModal>
    </div>
  )
}
