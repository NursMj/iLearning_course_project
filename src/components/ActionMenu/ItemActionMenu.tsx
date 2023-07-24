import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MySpinner from '../../common/MySpinner'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { showErrorToast, showSuccessToast } from '../../utils/showToest'
import { deleteItem } from '../../http/itemApi'
import { deleteCollection } from '../../http/collectionApi'
import { useLocation } from 'react-router-dom'
import checkIsOwner from '../../utils/checkIsOwner'
import { getCollectionItems } from '../../store/itemsReducer'
import { getUserCollections } from '../../store/collectionsReducer'

const ItemActionMenu = ({ item, setShowModal, type }: any) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const isItem = type === 'item'
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state: any) => state.user.user.data)
  const deleteFunction = isItem ? deleteItem : deleteCollection
  const idForRefresh = isItem ? item.CollectionId : item.UserId
  const refreshFunction = isItem ? getCollectionItems : getUserCollections
  const location = useLocation()
  const ownerId =
    useSelector(
      (state: any) => state.collections.currentCollection.data.UserId
    ) || item.UserId
  const isOwner = checkIsOwner(user, ownerId)
  const showActionBtns =
    (location.pathname.includes('collection') ||
      location.pathname.includes('user')) &&
    isOwner

  const handleClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  async function handleDelete(e: any) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await deleteFunction({ id: item.id, userId: ownerId })
      dispatch(refreshFunction(idForRefresh) as any)
      showSuccessToast(res.message)
    } catch (e: any) {
      showErrorToast(e)
    }
    setIsLoading(false)
    handleClose()
  }

  function handleEdit(e: any) {
    e.preventDefault()
    setShowModal(item.id)
    handleClose()
  }

  if (!showActionBtns) return

  return (
    <>
      <IconButton aria-label="actions" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {isLoading && <MySpinner />}
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

export default ItemActionMenu
