import { useParams } from 'react-router-dom'
import ItemsList from '../components/ItemsList'
import Toolbar from '../components/ToolBar'
import MyModalDialog from '../common/MyModalDialog'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import MySpinner from '../common/MySpinner'
import AddItemForm from '../components/Forms/AddItemForm'
import { refreshCurrentCollection, refreshItems } from '../utils/refreshers'

function CollectionPage() {
  // const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const id = Number(useParams().id)
  const items = useSelector((state: any) => state.items.items)
  const itemsLoading = useSelector((state: any) => state.items.loading)
  const dispatch = useDispatch()
  const collection = useSelector(
    (state: any) => state.collections.currentCollection
  )
  const isLoading = useSelector(
    (state: any) => state.collections.currentIsLoading
  )

  useEffect(() => {
    refreshCurrentCollection(dispatch, id)
    refreshItems(dispatch)
  }, [])

  const handleClose = () => setShowModal(false)

  const modalContent = <AddItemForm handleClose={handleClose} />

  if (isLoading) return <MySpinner />

  return (
    <>
      <Typography variant="h5">Collection '{collection.name}'</Typography>
      <p>{collection.desc}</p>
      <p>Topic: {collection?.Topic?.name}</p>
      <Toolbar props={{ setShowModal }} />
      {itemsLoading ? <MySpinner /> : <ItemsList data={items} type="item" />}
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default CollectionPage
