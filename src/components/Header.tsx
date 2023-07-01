import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
} from '@mui/material'
import { Button } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MoreIcon from '@mui/icons-material/MoreVert'
import DarkModeSwitch from './DarkModeSwitch'
import { useSelector, useDispatch } from 'react-redux'
import { setUnsetDarkMode } from '../store/darkModeReducer'
import LanguageSelect from './LanguageSelect'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MyLink from '../common/MyLink'
import HeaderMenu from './HeaderMenu'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

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
  const isAdmin = false
  const [isAuth, setIsAuth] = React.useState(true)

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
    setIsAuth(false)
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('header.search_placeholder')}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
            {isAuth ? (
              isAdmin ? (
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
              )
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
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
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
        }}
      />
    </Box>
  )
}
