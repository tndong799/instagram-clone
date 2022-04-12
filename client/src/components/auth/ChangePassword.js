import {useContext, useState} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { PostContext } from '../../contexts/PostContext';
import { stringAvatar } from '../../utils/setMui';
import { IconButton, Avatar } from '@mui/material';

export default function ChangePassword() {
    const {authState: {user: {image, username, firstname, lastname}}, updateUser} = useContext(AuthContext)
    const { setShowToast} = useContext(PostContext)
    const [userForm, setUserForm] = useState({
        username: username,
        oldPassword: '',
        password: '',
        confirmPassword: '',
    })
    const [checkChangeForm, setCheckChangeForm] = useState(false)

    const handleChangeForm = (e) => {
        setUserForm({...userForm,[e.currentTarget.name]: e.currentTarget.value})
        setCheckChangeForm(true)
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const {oldPassword , password , confirmPassword} = userForm
        if(!oldPassword || !password || !confirmPassword){
            setShowToast({
                show: true,
                message: 'Các trường mật khẩu không được để trống.'
            })
            return
        }
        if(password !== confirmPassword){
            setShowToast({
                show: true,
                message: 'Mật khẩu và nhập lại mật khẩu không khớp.'
            })
            return
        }
        const form = new FormData()
        form.append('oldPassword',oldPassword)
        form.append('password', password)
        try {
            const {success, message} = await updateUser(form)
            setShowToast({
                show: true,
                message: message,
                type: success
            })
            setUserForm({
                ...userForm,
                oldPassword: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='flex flex-[1_1_400px] flex-col'>
        <div className='flex flex-row justify-start mt-8'>
            <div className='md:m-[2px_32px_0_124px] h-[38px] w-[38px] xs:m-[2px_32px_0_80px]'>
                <IconButton sx={{padding: 0}} >
                    {image 
                    ? <Avatar alt={firstname+' '+lastname} src={image} sx={{height:'38px',width:'38px'}}/> 
                    : <Avatar {...stringAvatar(firstname+' '+lastname)} sx={{height:'38px',width:'38px', fontSize: {xs: 20, md:32}}}/>}
                </IconButton>
            </div>
            <div className='flex flex-[0_1_auto] flex-col'>
                <h1 className='text-xl leading-[22px] mb-0.5 font-normal' title={username}>{username}</h1>
            </div>
        </div>
        <form method='POST' className='flex items-stretch flex-col my-4' onSubmit={handleSubmitForm}>
            <input type="text" onChange={handleChangeForm} name="username" value={userForm.username || ''} autoComplete="username" className='hidden'></input>
            <div className='flex flex-row justify-start mb-4'>
                <aside className='px-8 text-right md:flex-[0_0_194px] xs:flex-[0_0_148px] xs:pl-0 text-[#262626] text-base font-semibold leading-[18px] mt-1.5'>
                    <label htmlFor='oldPassword'>Mật khẩu cũ</label>
                </aside>
                <div className='flex flex-row basis-[355px] pr-15 text-[#262626] text-base grow justify-start'>
                    <div className='w-full max-w-[355px] flex-[0_0_auto]'>
                        <input id='oldPassword' type='password' name='oldPassword' autoComplete='current-password' onChange={handleChangeForm} value={userForm.oldPassword || ''} className='w-full p-[0_10px] h-8 text-base flex-[0_1_355px] text-[#262626] rounded-[3px] border border-[#dbdbdb] border-solid'></input>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-start mb-4'>
                <aside className='px-8 text-right md:flex-[0_0_194px] xs:flex-[0_0_148px] xs:pl-0 text-[#262626] text-base font-semibold leading-[18px] mt-1.5'>
                    <label htmlFor='newPassword'>Mật khẩu mới</label>
                </aside>
                <div className='flex flex-row basis-[355px] pr-15 text-[#262626] text-base grow justify-start'>
                    <div className='w-full max-w-[355px] flex-[0_0_auto]'>
                        <input onChange={handleChangeForm} name='password' autoComplete='new-password'  id='newPassword' type='password' value={userForm.password || ''} className='w-full p-[0_10px] h-8 text-base flex-[0_1_355px] text-[#262626] rounded-[3px] border border-[#dbdbdb] border-solid'></input>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-start mb-4'>
                <aside className='px-8 text-right md:flex-[0_0_194px] xs:flex-[0_0_148px] xs:pl-0 text-[#262626] text-base font-semibold leading-[18px] mt-1.5'>
                    <label htmlFor='confirmPassword'>Xác nhận mật khẩu mới</label>
                </aside>
                <div className='flex flex-row basis-[355px] pr-15 text-[#262626] text-base grow justify-start'>
                    <div className='w-full max-w-[355px] flex-[0_0_auto]'>
                        <input onChange={handleChangeForm} name='confirmPassword' autoComplete='new-password'  id='confirmPassword' type='password' value={userForm.confirmPassword || ''} className='w-full p-[0_10px] h-8 text-base flex-[0_1_355px] text-[#262626] rounded-[3px] border border-[#dbdbdb] border-solid'></input>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-start mb-4'>
                <aside className='px-8 text-right md:flex-[0_0_194px] xs:flex-[0_0_148px] xs:pl-0 text-[#262626] text-base font-semibold leading-[18px] mt-1.5'>
                    <label></label>
                </aside>
                <div className='flex flex-row basis-[355px] pr-15 text-[#262626] text-base grow justify-start'>
                    <div className='w-full max-w-[355px] flex-[0_0_auto]'>
                        <button disabled={!checkChangeForm}  type='submit' className={`bg-[#0095f6] rounded text-[#fff] text-[14px] font-semibold p-[5px_9px] ${!checkChangeForm && 'opacity-30'}`}>Đổi mật khẩu</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}
