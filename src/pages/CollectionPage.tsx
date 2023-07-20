import { useParams } from 'react-router-dom'
import ItemsGrid from '../components/ItemsGrid'
import Toolbar from '../components/ToolBar'
import MyModalDialog from '../common/MyModalDialog'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import MySpinner from '../common/MySpinner'
import AddItemForm from '../components/Forms/AddItemForm'
import checkIsOwner from '../utils/checkIsOwner'
import { getCurrentCollection } from '../store/collectionsReducer'
import { getCollectionItems } from '../store/itemsReducer'
import { checkUser } from '../store/userReducer'
import ReactMarkdown from 'react-markdown'

function CollectionPage() {
  // const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const collectionId = Number(useParams().id)
  const user = useSelector((state: any) => state.user.user.data)
  const items = useSelector((state: any) => state.items.items.data)
  const itemsLoading = useSelector((state: any) => state.items.items.loading)
  const itemsError = useSelector((state: any) => state.items.items.error)
  const dispatch = useDispatch()
  const collection = useSelector(
    (state: any) => state.collections.currentCollection.data
  )
  const isLoading = useSelector(
    (state: any) => state.collections.currentCollection.isLoading
  )
  const isOwner = checkIsOwner(user, collection.UserId)
  const [itemId, setItemId] = useState(0)


  const handleOpenEdditForm = (id: number) => {
    setItemId(id)
    setShowModal(true)
  }
  const handleClose = () => {
    setItemId(0)
    setShowModal(false)
  }

  useEffect(() => {
    dispatch(checkUser() as any)
    dispatch(getCurrentCollection(collectionId) as any)
    dispatch(getCollectionItems({ collectionId }) as any)
  }, [])


  const modalContent = <AddItemForm handleClose={handleClose} itemId={itemId} />

  if (isLoading) return <MySpinner />

  return (
    <>
      <Box>
        <Typography variant="h5">Collection '{collection.name}'</Typography>
        <Typography>
          <b>Topic:</b> {collection?.Topic?.name || 'Other'}
        </Typography>
        {collection.img && (
          <Box
            sx={{
              width: { xs: '100%', sm: '60%', md: '40%' },
              mb: 3,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                pt: '56.25%',
              }}
            >
              <img
                src={collection?.img}
                alt=""
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>
        )}
        <Typography sx={{ mt: 2 }}>
          <b>Description:</b>
        </Typography>
        <ReactMarkdown>{collection.desc}</ReactMarkdown>
      </Box>
      <hr />
      <Toolbar props={{ setShowModal, isOwner }} />
      {itemsLoading ? (
        <MySpinner />
      ) : (
        <ItemsGrid
          data={items}
          error={itemsError}
          setShowModal={handleOpenEdditForm}
          type="item"
        />
      )}
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default CollectionPage
