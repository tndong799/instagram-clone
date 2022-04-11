import {useState, useContext, useEffect, useRef} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom'
import AlertMessage from '../layouts/AlertMessage';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';

export default function LoginForm() {
  const formRef = useRef()
  const {loginUser} = useContext(AuthContext)

  const [loginForm,setLoginForm] = useState({
    username: '',
    password: ''
  })
  const [alert, setAlert] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const loginData = await loginUser(loginForm)
      if(!loginData.success){
        const { message } = loginData
        setAlert({
          type: 'error', message
        })
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    let id = setTimeout(() => {
      setAlert(null)
    },5000)
    return () => clearTimeout(id)
  },[alert])
  
  return (
    <>
      {/* <Typography component="h1" variant="h5">
        Đăng nhập
      </Typography> */}
      <AlertMessage info={alert}></AlertMessage>
      <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Tài khoản"
          name="username"
          autoComplete="username"
          value={loginForm.username}
          onChange={(e) => {
            setLoginForm({...loginForm, username: e.target.value})
          }}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          id="password"
          value={loginForm.password}
          onChange={(e) => {
            setLoginForm({...loginForm, password: e.target.value})
          }}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton 
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => formRef.current.reportValidity()}
        >
          Đăng nhập
        </Button>
        <Grid container>
          <Grid item xs>
            {/* <Link href="#" variant="body2">
              Forgot password?
            </Link> */}
          </Grid>
          <Grid item>
            <Link to='/register'>
              {"Bạn chưa có tài khoản ư? Đăng ký ngay!"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
