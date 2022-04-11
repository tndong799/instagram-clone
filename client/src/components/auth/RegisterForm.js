import {useRef, useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AlertMessage from '../layouts/AlertMessage';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';

export default function RegisterForm() {
  const { registerUser } = useContext(AuthContext)
  const formRef = useRef()
  const [formUser, setFormUser] = useState({
    firstname: '',
    lastname:'',
    username: '',
    password: '',
    repassword: ''
  }) 
  const [alert, setAlert] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const handleClickShowPassword = (input) => {
    input === 'password' ? setShowPassword(!showPassword) : setShowRePassword(!showRePassword)
  };
  const handleMouseDownPassword = (input) => {
    input === 'password' ? setShowPassword(!showPassword) : setShowRePassword(!showRePassword)
  };

  const { firstname, lastname, username, password, repassword} = formUser


  const handleChangeInput = (e) => {
    setFormUser({...formUser,[e.currentTarget.name]: e.currentTarget.value})
    
  }
  useEffect(() => {
    let id = setTimeout(() => {
      setAlert(null)
    },5000)
    return () => clearTimeout(id)
  },[alert])

  const handleSubmit = async(event) => {
    event.preventDefault()
    if(password !== repassword){
      setAlert({type: 'error', message: 'The password and confirmation password do not match.'})
      return
    }
    try {
      const registerData = await registerUser(formUser)
      if(!registerData.success){
        const { message } = registerData
        setAlert({
          type: 'error', message
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Typography className='text-center !text-base !font-semibold !leading-5 text-[#8e8e8e] !my-2.5' component="h2" variant="h5">
        Đăng ký để xem ảnh và video từ bạn bè.
      </Typography>
      <AlertMessage info={alert} ></AlertMessage>
      <Box component="form" ref={formRef} noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstname"
              required
              fullWidth
              id="firstname"
              label="Họ"
              autoFocus
              value={firstname}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastname"
              label="Tên"
              name="lastname"
              autoComplete="family-name"
              value={lastname}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Tài khoản"
              name="username"
              autoComplete="off"
              value={username}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="off"
              value={password}
              onChange={handleChangeInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton 
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('password')}
                    onMouseDown={() => handleMouseDownPassword('password')}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            >
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="repassword"
              label="Nhập lại mật khẩu"
              type={showRePassword ? 'text' : 'password'}
              id="repasword"
              autoComplete="off"
              value={repassword}
              onChange={handleChangeInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton 
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('repassword')}
                    onMouseDown={() => handleMouseDownPassword('repassword')}>
                      {showRePassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid> */}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => formRef.current.reportValidity()}
        >
          Đăng ký
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              {'Bạn đã có tài khoản? Đăng nhập'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
