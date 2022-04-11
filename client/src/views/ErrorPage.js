import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='text-center p-[40px] text-[#262626]'>
      <Typography sx={{fontSize: 22, lineHeight: '26px', fontWeight: 500}} variant="h2" component="h2">Rất tiếc, trang này hiện không khả dụng.</Typography>
      <Typography sx={{display:'block',marginTop: '40px',fontSize: 16,lineHeight:'14px',fontWeight:400}} variant="p" component="p">
        Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ. <Link to="/home" className='text-[#00376b]'>Quay lại Instagram.</Link>
      </Typography>
    </div>
  )
}
