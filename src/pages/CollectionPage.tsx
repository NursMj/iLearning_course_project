import { useParams } from 'react-router-dom'
import ItemsList from '../components/ItemsList'
import Toolbar from '../components/ToolBar'
import MyModalDialog from '../common/MyModalDialog'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { fetchCurrent } from '../store/collectionsReducer'
import MySpinner from '../common/MySpinner'
import AddItemForm from '../components/Forms/AddItemForm'

function CollectionPage() {
  // const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const id = Number(useParams().id)
  const data = [
    { id: 1, title: 'item1', collaction: 'collaction1', author: 'author1' },
    { id: 2, title: 'item2', collaction: 'collaction2', author: 'author2' },
    { id: 3, title: 'item3', collaction: 'collaction3', author: 'author3' },
    { id: 4, title: 'item4', collaction: 'collaction4', author: 'author4' },
  ]
  const dispatch = useDispatch()
  const collection = useSelector(
    (state: any) => state.collections.currentCollection
  )
  const isLoading = useSelector(
    (state: any) => state.collections.currentIsLoading
  )

  useEffect(() => {
    dispatch(fetchCurrent(id) as any)
  }, [dispatch])

  const handleClose = () => setShowModal(false)

  const modalContent = <AddItemForm handleClose={handleClose} />

  if (isLoading) return <MySpinner />

  return (
    <>
      <Typography variant="h5">Collection '{collection.name}'</Typography>
      <p>{collection.desc}</p>
      <p>Topic: {collection.topic}</p>
      <Toolbar props={{ setShowModal }} />
      <ItemsList data={data} type="item" />
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default CollectionPage
