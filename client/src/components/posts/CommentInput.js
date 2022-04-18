import {useRef, useState, useEffect, useContext} from 'react'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { CommentContext } from '../../contexts/CommentContext';
import Toast from '../layouts/Toast';

function useOutsideAlerter(ref,cb) {
    useEffect(() => {
        /**
       * Alert if clicked on outside of element
       */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                cb()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function CommentInput({postId}) {
    const {addComment} = useContext(CommentContext)
    const refInput = useRef(null)
    const [showEmoji,setShowEmoji] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: ''
    })
    const [value,setValue] = useState('')

    const onEmojiClick = (event, emojiObject) => {
        setValue(value + emojiObject.emoji)
    };
    const handleShowEmoji = () => {
        setShowEmoji(true)
    }
    const handleCloseEmoji = () => {
        setShowEmoji(false)
    }
    useOutsideAlerter(refInput,handleCloseEmoji);
    const handleChangeInput = (e) => {
        setValue(e.target.value)
    }
    const onSubmitComment = async (e) => {
        e.preventDefault()
        const form = new URLSearchParams()
        form.append('title', value)
        form.append('post', postId)
        try {
            const res = await addComment(form)
            setShowToast({
                show:true,
                message: res.message
            })
            if(res.success){
                setValue('')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleCloseToast = () => {
        setShowToast({
            show: false,
            message: ''
        })
    }
  return (
    <div ref={refInput} className='px-4 py-1.5 border-t border-solid border-[#efefef] text-sm text-[#8e8e8e]'>
        <form className='flex items-center relative grow shrink' onSubmit={onSubmitComment} method="POST">
            <div className='p-[8px_16px_8px_0]'>
                <button type='button'  onClick={handleShowEmoji}><SentimentSatisfiedOutlinedIcon /></button>
                <div className='absolute right-3 bottom-[360px] flex shrink-0 w-full h-full'>
                    {showEmoji && <Picker
                        onEmojiClick={onEmojiClick}
                        disableAutoFocus={true}
                        skinTone={SKIN_TONE_MEDIUM_DARK}
                        groupNames={{ smileys_people: 'PEOPLE' }}
                        native
                    />}
                </div>
            </div>
            <textarea onClick={handleCloseEmoji} onChange={handleChangeInput} value={value} className='h-[18px] text-[#262626] max-h-[80px] outline-none p-0 resize-none w-0 border-0 flex grow overflow-hidden text-[14px] leading-[18px]' placeholder='Thêm bình luận'></textarea>
            <button type='submit' className={`border-0 text-[#0095f6] inline-block p-0 relative font-semibold ${value.length === 0 ? 'opacity-[0.3] pointer-events-none': ''}`} >Đăng</button>
        </form>
        <Toast showToast={showToast} onCloseToast={handleCloseToast} />
    </div>
  )
}
