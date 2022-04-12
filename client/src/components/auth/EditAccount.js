import {useContext, useState} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { PostContext } from '../../contexts/PostContext';
import { stringAvatar } from '../../utils/setMui';
import { IconButton, Avatar } from '@mui/material';

export default function EditAccount() {
    const {authState: {user: {image, username, firstname, lastname}}, setOpenModalAvt, updateUser} = useContext(AuthContext)
    const { setShowToast} = useContext(PostContext)
    const [userForm, setUserForm] = useState({ firstname, lastname})
    const [checkChangeForm, setCheckChangeForm] = useState(false)

    const handleShowModalUpdateAvt = () => {
        setOpenModalAvt(true)
      }
    const handleChangeForm = (e) => {
        setUserForm({...userForm,[e.currentTarget.name]: e.currentTarget.value})
        setCheckChangeForm(true)
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (!userForm.firstname || !userForm.lastname) {
            setShowToast({
                show: true,
                message: 'Họ và Tên không được để trống'
            })
        return false;
        }
        const form = new FormData()
        form.append('firstname', userForm.firstname)
        form.append('lastname', userForm.lastname)
        try {
            const {success, message} = await updateUser(form)
            setShowToast({
                show: true,
                message: message,
                type: success
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex flex-[1_1_400px] flex-col'>
            <div className='flex flex-row justify-start mt-8'>
                <div className='md:m-[2px_32px_0_124px] h-[38px] w-[38px] xs:m-[2px_32px_0_80px]'>
                    <IconButton sx={{padding: 0}} onClick={handleShowModalUpdateAvt}>
                        {image 
                        ? <Avatar alt={firstname+' '+lastname} src={image} sx={{height:'38px',width:'38px'}}/> 
                        : <Avatar {...stringAvatar(firstname+' '+lastname)} sx={{height:'38px',width:'38px', fontSize: {xs: 20, md:32}}}/>}
                    </IconButton>
                </div>
                <div className='flex flex-[0_1_auto] flex-col'>
                    <h1 className='text-xl leading-[22px] mb-0.5 font-normal' title={username}>{username}</h1>
                    <button onClick={handleShowModalUpdateAvt} className='text-[#0095f6] text-md font-semibold leading-[18px]'>Thay đổi ảnh đại diện</button>
                </div>
            </div>
            <form method='POST' className='flex items-stretch flex-col my-4' onSubmit={handleSubmitForm}>
                <div className='flex flex-row justify-start mb-4'>
                    <aside className='px-8 text-right xs:pl-0 md:flex-[0_0_194px] xs:flex-[0_0_148px] text-[#262626] text-base font-semibold leading-[18px] mt-1.5'>
                        <label htmlFor='username'>Tên người dùng</label>
                    </aside>
                    <div className='flex flex-row basis-[355px] pr-15 text-[#262626] text-base grow justify-start'>
                        <div className='w-full max-w-[355px] flex-[0_0_auto]'>
                            <input disabled id='username' type='text' value={username} className='w-full p-[0_10px] h-8 text-base bg-[#efefef] flex-[0_1_355px] text-[#8e8e8e] rounded-[3px] border border-[#dbdbdb] border-solid cursor-not-allowed'></input>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-start mb-4'>
                    <aside className='px-8 text-right xs:pl-0 md:flex-[0_0_194px] xs:flex-[0_0_148px] text-[#262626] text-base font-semibold leading-[18px] mt-1.5'>
                        <label htmlFor='firstname'>Họ</label>
                    </aside>
                    <div className='flex flex-row basis-[355px] pr-15 text-[#262626] text-base grow justify-start'>
                        <div className='w-full max-w-[355px] flex-[0_0_auto]'>
                            <input onChange={handleChangeForm} name='firstname' id='firstname' type='text' value={userForm.firstname} className='w-full p-[0_10px] h-8 text-base flex-[0_1_355px] text-[#262626] rounded-[3px] border border-[#dbdbdb] border-solid'></input>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-start mb-4'>
                    <aside className='px-8 text-right xs:pl-0 md:flex-[0_0_194px] xs:flex-[0_0_148px] text-[#262626] text-base font-semibold leading-[18px] mt-1.5'>
                        <label htmlFor='lastname'>Tên</label>
                    </aside>
                    <div className='flex flex-row basis-[355px] pr-15 text-[#262626] text-base grow justify-start'>
                        <div className='w-full max-w-[355px] flex-[0_0_auto]'>
                            <input onChange={handleChangeForm} name='lastname'  id='lastname' type='text' value={userForm.lastname} className='w-full p-[0_10px] h-8 text-base flex-[0_1_355px] text-[#262626] rounded-[3px] border border-[#dbdbdb] border-solid'></input>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-start mb-4'>
                    <aside className='px-8 text-right xs:pl-0 md:flex-[0_0_194px] xs:flex-[0_0_148px] text-[#262626] text-base font-semibold leading-[18px] mt-1.5'>
                        <label></label>
                    </aside>
                    <div className='flex flex-row basis-[355px] pr-15 text-[#262626] text-base grow justify-start'>
                        <div className='w-full max-w-[355px] flex-[0_0_auto]'>
                            <button disabled={!checkChangeForm}  type='submit' className={`bg-[#0095f6] rounded text-[#fff] text-[14px] font-semibold p-[5px_9px] ${!checkChangeForm && 'opacity-30'}`}>Gửi</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
