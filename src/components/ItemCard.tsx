import Typography from '@mui/material/Typography'
import MyLink from '../common/MyLink'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem } from '../http/itemApi'
import { useState } from 'react'
import MySpinner from '../common/MySpinner'
import { deleteCollection } from '../http/collectionApi'
import { useLocation } from 'react-router-dom'
import checkIsOwner from '../utils/checkIsOwner'
import { getCollectionItems } from '../store/itemsReducer'
import { getUserCollections } from '../store/collectionsReducer'
import { showErrorToast, showInfoToast } from '../utils/showToest'

function ItemCard(props: any) {
  const { item, type, setShowModal } = props
  const path = `/${type}/${item.id}`
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
  const showActionBtns = location.pathname != '/' && isOwner

  async function handleDelete(e: any) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await deleteFunction({ id: item.id, userId: ownerId })
      dispatch(refreshFunction(idForRefresh) as any)
      showInfoToast(res.message)
    } catch (e: any) {
      showErrorToast(e)
    }
    setIsLoading(false)
  }

  function handleEdit(e: any) {
    e.preventDefault()
    setShowModal(item.id)
  }

  const ItemContent = () => {
    return (
      <>
        <Typography variant="h5" component="div">
          {item.requiredField1_value}
        </Typography>
        <Typography color="text.secondary">
          Collection: {item?.Collection?.name}
        </Typography>
        <Typography color="text.secondary">
          likes: {item?.likesCount || item?.Likes?.length || 0}
        </Typography>
      </>
    )
  }

  const CollectionContent = () => {
    return (
      <>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography color="text.secondary">
          Items amount: {item?.Items?.length}
        </Typography>
      </>
    )
  }

  return (
    <Box
      sx={{
        m: { xs: '0 auto', sm: 0 },
        width: { xs: '90%', sm: '270px' },
      }}
    >
      <MyLink
        to={path}
        content={
          <Paper
            sx={{
              position: 'relative',
              p: 2,
            }}
          >
            {showActionBtns && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  display: 'flex',
                  gap: 1,
                }}
              >
                {isLoading && <MySpinner />}
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
            {isItem ? <ItemContent /> : <CollectionContent />}
            <Typography variant="body2">
              Author: {item?.Collection?.User?.name || item?.User?.name}
            </Typography>
          </Paper>
        }
      />
    </Box>
  )
}

export default ItemCard
