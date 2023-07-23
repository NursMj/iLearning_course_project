import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MyLink from '../common/MyLink'
import { deleteUser, updateUserRole, updateUserStatus } from '../http/userApi'
import MySpinner from '../common/MySpinner'
import { checkUser, getAllUsers } from '../store/userReducer'
import { useDispatch } from 'react-redux'
import { showErrorToast, showSuccessToast } from '../utils/showToest'

const ItemActionMenu = ({ user }: any) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [loading, setLoading] = useState(false)
  const isUserAdmin = user.role === 'ADMIN'
  const dispatch = useDispatch()

  const refreshData = async () => {
    await dispatch(getAllUsers() as any)
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeRole = async () => {
    const role = isUserAdmin ? 'USER' : 'ADMIN'
    setLoading(true)
    try {
      const res = await updateUserRole({ id: user.id, role })
      handleClose()
      showSuccessToast(res.message)
      refreshData()
    } catch (error) {
      showErrorToast(error)
    }
    setLoading(false)
    dispatch(checkUser() as any)
  }

  const handleChangeStatus = async () => {
    setLoading(true)
    try {
      const res = await updateUserStatus({ id: user.id, blocked: !user.blocked })
      handleClose()
      showSuccessToast(res.message)
      refreshData()
    } catch (error) {
      showErrorToast(error)
    }
    setLoading(false)
    dispatch(checkUser() as any)
  }

  const handleDeleteUser = async () => {
    setLoading(true)
    try {
      const res = await deleteUser(user.id)
      handleClose()
      showSuccessToast(res.message)
      refreshData()
    } catch (error) {
      showErrorToast(error)
    }
    setLoading(false)
    dispatch(checkUser() as any)
  }

  return (
    <>
      <IconButton aria-label="actions" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {loading && <MySpinner />}
        <MyLink
          to={`/user/${user.id}`}
          content={<MenuItem onClick={handleClose}>Go to user page</MenuItem>}
        />
        <MenuItem onClick={handleChangeRole}>
          {isUserAdmin ? 'Remove from' : 'Add to'} admin
        </MenuItem>
        <MenuItem onClick={handleChangeStatus}>
          {user.blocked ? 'Unblock' : 'Block'} user
        </MenuItem>
        <MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
      </Menu>
    </>
  )
}

export default ItemActionMenu
