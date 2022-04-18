import React from 'react'
import { Snackbar,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function Toast({showToast,onCloseToast}) {
    const action = (
        <>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onCloseToast}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </>
    );
  return (
    <Snackbar
    open={showToast.show}
    autoHideDuration={4000}
    onClose={onCloseToast}
    message={showToast.message}
    action={action}
    />
  )
}
