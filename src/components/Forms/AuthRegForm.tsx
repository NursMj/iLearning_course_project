import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import { Alert } from '@mui/material'
import { Spinner } from 'react-bootstrap'

function AuthRegForm(props: any) {
  const {
    isLoading,
    isLogin,
    handleSubmit,
    setName,
    name,
    setPassword,
    password,
    setEmail,
    email,
    error,
    setError,
  } = props.props
  const { t } = useTranslation()

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {error && <Alert severity="warning">{error}</Alert>}
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
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
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
                onChange={(e: any) => setEmail(e.target.value)}
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
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? t('login_form.btn_login') : t('login_form.btn_register')}
          </Button>
          <Grid container justifyContent="flex-end">
            {isLogin ? (
              <Grid item>
                {t('login_form.dont_have_ac')}{' '}
                <NavLink onClick={() => setError('')} to={REGISTRATION_ROUTE}>
                  {t('login_form.singup_link')}
                </NavLink>
              </Grid>
            ) : (
              <Grid item>
                {t('login_form.have_ac')}{' '}
                <NavLink onClick={() => setError('')} to={LOGIN_ROUTE}>
                  {t('login_form.login_link')}
                </NavLink>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default AuthRegForm
