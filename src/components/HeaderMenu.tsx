import { Menu, MenuItem, IconButton } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useTranslation } from 'react-i18next'
import MyLink from '../common/MyLink'
import { useSelector } from 'react-redux'

const MobileMenu = (props: any) => {
  const {
    mobileMenuId,
    mobileMoreAnchorEl,
    isMobileMenuOpen,
    handleMobileMenuClose,
    handleProfileMenuOpen,
    // handleLogout,
    // user
  } = props
  // const { t } = useTranslation()

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
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
    user
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
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleLogout={handleLogout}
        user={user}
      />
    </>
  )
}

export default HeaderMenu
