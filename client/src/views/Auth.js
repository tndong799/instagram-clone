import {  useContext} from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import logo from '../assets/text-logo.png';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import InstagramIcon from '@mui/icons-material/Instagram';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

function Auth({authRoute}) {
  const { authState: {isAuthenticated, authLoading} } = useContext(AuthContext)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img alt='logo' className='h-12' src={logo}></img>
          {authLoading ?  <div className='flex justify-center mt-6'>
                            <CircularProgress color='secondary' />
                          </div>
                      : isAuthenticated ? <Navigate replace to='/home'></Navigate> 
                      : <>
                            { authRoute === 'login' && <LoginForm /> }
                            { authRoute === 'register' && <RegisterForm /> }
                        </>}
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  )
}
export default Auth