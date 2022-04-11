import React from 'react'
import Alert from '@mui/material/Alert';

export default function AlertMessage({info}) {
  return info === null ? null : (
    <Alert className='mt-5' variant="outlined" severity={info.type}>
        {info.message}
    </Alert>
  )
}
