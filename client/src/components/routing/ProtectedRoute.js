import {useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import NavbarMenu from '../layouts/NavbarMenu';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { PostContext } from '../../contexts/PostContext';


import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ProtectedRoute({navigatePath = '/login'}) {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    const {showToast: {show, message}, setShowToast} = useContext(PostContext)
    if(authLoading)
        return (
            <div className='flex justify-center mt-6 min-h-screen items-center'>
                <CircularProgress />
            </div>
        )
    if(!isAuthenticated){
        return <Navigate to={navigatePath} replace />
    }

    const onCloseToast = () => setShowToast({show: false, message: '', type: null})
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
        <>
            <NavbarMenu></NavbarMenu>
            <Outlet />
            {
                <Snackbar
                open={show}
                autoHideDuration={4000}
                onClose={onCloseToast}
                message={message}
                action={action}
                />
            }
        </>
        )
  
}
