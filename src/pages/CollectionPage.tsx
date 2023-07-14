import { useParams } from 'react-router-dom'
import ItemsList from '../components/ItemsGrid'
import Toolbar from '../components/ToolBar'
import MyModalDialog from '../common/MyModalDialog'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import MySpinner from '../common/MySpinner'
import AddItemForm from '../components/Forms/AddItemForm'
import checkIsOwner from '../utils/checkIsOwner'
import { getCurrentCollection } from '../store/collectionsReducer'
import { getCollectionItems } from '../store/itemsReducer'

function CollectionPage() {
  // const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const collectionId = Number(useParams().id)
  const user = useSelector((state: any) => state.user.user)
  const items = useSelector((state: any) => state.items.items)
  const itemsLoading = useSelector((state: any) => state.items.loading)
  const dispatch = useDispatch()
  const collection = useSelector(
    (state: any) => state.collections.currentCollection.data
  )
  const isLoading = useSelector(
    (state: any) => state.collections.currentCollection.isLoading
  )
  const isOwner = checkIsOwner(user, collection.UserId)

  useEffect(() => {
    dispatch(getCurrentCollection(collectionId) as any)
    dispatch(getCollectionItems(collectionId) as any)
  }, [])

  const handleClose = () => setShowModal(false)

  const modalContent = <AddItemForm handleClose={handleClose} />

  if (isLoading) return <MySpinner />

  return (
    <>
      <Typography variant="h5">Collection '{collection.name}'</Typography>
      <p>Topic: {collection?.Topic?.name}</p>
      <p>Description: {collection.desc}</p>
      <Toolbar props={{ setShowModal, isOwner }} />
      {itemsLoading ? <MySpinner /> : <ItemsList data={items} type="item" />}
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default CollectionPage
