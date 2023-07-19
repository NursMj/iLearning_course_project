import { Menu, MenuItem, Box, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useTranslation } from 'react-i18next'
import MyLink from '../common/MyLink'
import { useSelector, useDispatch } from 'react-redux'
import DarkModeSwitch from './DarkModeSwitch'
import LanguageSelect from './LanguageSelect'
import { setUnsetDarkMode } from '../store/darkModeReducer'
import { useTheme } from '@mui/material/styles'

const MobileMenu = (props: any) => {
  const {
    isAdmin,
    mobileMenuId,
    mobileMoreAnchorEl,
    isMobileMenuOpen,
    handleMobileMenuClose,
    handleLogout,
    user,
    isSigning,
    isDarkMode,
  } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const theme = useTheme()
  const isLightTheme = theme.palette.mode === 'light'

  function logout() {
    handleMobileMenuClose()
    handleLogout()
  }

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Box
        sx={{
          width: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: isLightTheme ? '#2196f3' : 'transparent',
          p: 1.5,
          pr: 2.5,
          mb: 1.5,
        }}
      >
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={() => dispatch(setUnsetDarkMode())}
        />
        <LanguageSelect />
        {user.isAuth && (
          <Typography sx={{ color: '#fff' }}>
            <AccountCircle /> {user.data.name}
          </Typography>
        )}
      </Box>
      <MyLink
        sx={{ display: { xs: 'block', sm: 'none' } }}
        to="/"
        content={<MenuItem>{t('header.title')}</MenuItem>}
      />
      {user.isAuth ? (
        <>
          {isAdmin && (
            <MyLink
              to="/admin"
              content={
                <MenuItem onClick={handleMobileMenuClose}>
                  {t('header.menu_item3')}
                </MenuItem>
              }
            />
          )}
          <MyLink
            to={`/user/${user.data.id}`}
            content={
              <MenuItem onClick={handleMobileMenuClose}>
                {t('header.menu_item1')}
              </MenuItem>
            }
          />
          <MyLink
            to="/"
            content={
              <MenuItem onClick={logout}>{t('header.menu_item2')}</MenuItem>
            }
          />
        </>
      ) : (
        !isSigning && (
          <MyLink
            to="/login"
            content={
              <MenuItem onClick={logout}>{t('header.sign_in')}</MenuItem>
            }
          />
        )
      )}
    </Menu>
  )
}

const DesktopMenu = (props: any) => {
  const {
    menuId,
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    isAdmin,
    handleLogout,
    user,
  } = props
  const { t } = useTranslation()

  function logout() {
    handleMenuClose()
    handleLogout()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ mt: 6 }}
    >
      {isAdmin && (
        <MyLink
          to="/admin"
          content={
            <MenuItem onClick={handleMenuClose}>
              {t('header.menu_item3')}
            </MenuItem>
          }
        />
      )}
      <MyLink
        to={`/user/${user.data.id}`}
        content={
          <MenuItem onClick={handleMenuClose}>
            {t('header.menu_item1')}
          </MenuItem>
        }
      />
      <MyLink
        to="/"
        content={<MenuItem onClick={logout}>{t('header.menu_item2')}</MenuItem>}
      />
    </Menu>
  )
}

const HeaderMenu = (props: any) => {
  const {
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
  } = props.props
  const user = useSelector((state: any) => state.user.user)

  return (
    <>
      <DesktopMenu
        menuId={menuId}
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        isAdmin={isAdmin}
        handleLogout={handleLogout}
        user={user}
      />
      <MobileMenu
        isAdmin={isAdmin}
        user={user}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleLogout={handleLogout}
        isSigning={isSigning}
        isDarkMode={isDarkMode}
      />
    </>
  )
}

export default HeaderMenu
