import * as React from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { Button } from 'react-bootstrap'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeSwitch from './DarkModeSwitch'
import { useSelector, useDispatch } from 'react-redux'
import { setUnsetDarkMode } from '../store/darkModeReducer'
import LanguageSelect from './LanguageSelect'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MyLink from '../common/MyLink'
import HeaderMenu from './HeaderMenu'
import { setIsAuth, setUser } from '../store/userReducer'
import { showInfoToast } from '../utils/showToest'
import SearchInput from './SearchInput'

export default function Header() {
  const location = useLocation()
  const isSigning =
    location.pathname === '/login' || location.pathname === '/registration'
  const { t } = useTranslation()
  const isDarkMode = useSelector((state: any) => state.darkMode.darkMode)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const user = useSelector((state: any) => state.user.user)
  const isAdmin = user.data.role === 'ADMIN'

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  function handleLogout() {
    dispatch(setUser({}))
    dispatch(setIsAuth(false))
    localStorage.setItem('token', '')
    showInfoToast('Loged out')
  }

  const menuId = 'account-menu'
  const mobileMenuId = 'account-menu-mobile'

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <MyLink to="/" content={t('header.title')} />
          </Typography>
          <SearchInput />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 2,
              alignItems: 'center',
            }}
          >
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={() => dispatch(setUnsetDarkMode())}
            />
            <LanguageSelect />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pl: 3,
                borderLeft: '1px solid #fff',
              }}
            >
              <Typography>{user.data.name}</Typography>
              {user.isAuth ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              ) : (
                !isSigning && (
                  <MyLink
                    to="/login"
                    content={
                      <Button variant="outline-light">
                        {t('header.sign_in')}
                      </Button>
                    }
                  />
                )
              )}
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <HeaderMenu
        props={{
          menuId,
          mobileMenuId,
          anchorEl,
          mobileMoreAnchorEl,
          isMenuOpen,
          isMobileMenuOpen,
          handleMenuClose,
          handleMobileMenuClose,
          handleProfileMenuOpen,
          isAdmin,
          handleLogout,
          isSigning,
          isDarkMode,
        }}
      />
    </Box>
  )
}
