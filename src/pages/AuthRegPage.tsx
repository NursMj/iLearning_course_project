import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function AuthRegPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState('')
  const navigate = useNavigate()

  function storeEmail() {
    localStorage.setItem('email', email);
  }

  async function handleLogin(e: any){
    e.preventDefault()
    if (password.length > 0 && email != '') {
      // setIsLoading(true)
      // setError('')
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + 'users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password}),
      })
      if (response.ok) {
          // setIsAuth(true)
          storeEmail()
          navigate('/admin')
        } else {
          // const responseData = await response.json();
          // setError(responseData.error);
        }
      } catch (error) {
        // setError('Sorry but something went wrong on the server side, please try again later')
        console.log(error)
      }
      // setIsLoading(false)
    } else {
      // setError('Invalid email or password')
    }
  }

  async function handleRegistration(e: any) {
    e.preventDefault()
    if (password && userName) {
      // setError('')
      // setIsLoading(true)
      try {
        const response = await fetch(import.meta.env.VITE_API_URL+"users/registration", {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({name: userName,email: email,password: password,}),
        })
        if(response.ok) {
          const responseData = await response.json();
          alert(responseData.message);
          navigate('/')
        } else {
          // const responseData = await response.json();
          // setError(responseData.error);
        }
      } catch (error) {
        // setError('Sorry but something went wrong on the server side, please try again later')
        console.log(error);
      }
      // setIsLoading(false)
    } else {
      // setError('Please enter a valid email and fill all fields')
    }
  }

  const handleSubmit = isLogin ? handleLogin : handleRegistration

  return (
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin
            ? t('login_form.title_login')
            : t('login_form.title_registration')}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {!isLogin && (
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  fullWidth
                  id="name"
                  label={t('login_form.name')}
                  autoFocus
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t('login_form.email')}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={t('login_form.password')}
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? t('login_form.btn_login') : t('login_form.btn_register')}
          </Button>
          <Grid container justifyContent="flex-end">
            {isLogin ? (
              <Grid item>
                {t('login_form.dont_have_ac')}{' '}
                <NavLink 
                // onClick={() => setError('')} 
                to="/registration">
                  {t('login_form.singup_link')}
                </NavLink>
              </Grid>
            ) : (
              <Grid item>
                {t('login_form.have_ac')}{' '}
                <NavLink 
                // onClick={() => setError('')} 
                to="/login">
                  {t('login_form.login_link')}
                </NavLink>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default AuthRegPage
