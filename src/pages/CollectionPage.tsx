import { useParams } from 'react-router-dom'
import ItemsList from '../components/ItemsList'
import Toolbar from '../components/ToolBar'
import MyModalDialog from '../components/MyModalDialog'
import { useState } from 'react'
import AddCollectionForm from '../components/Forms/AddCollectionForm'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import MenuItem from '@mui/material/MenuItem'
// import DialogTitle from '@mui/material/DialogTitle'
// import { useTranslation } from 'react-i18next'
// import topics from '../consts/topics'
// import { Grid, Typography } from '@mui/material'

function CollectionPage() {
  // const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const id = useParams().id
  const data = [
    { id: 1, title: 'item1', collaction: 'collaction1', author: 'author1' },
    { id: 2, title: 'item2', collaction: 'collaction2', author: 'author2' },
    { id: 3, title: 'item3', collaction: 'collaction3', author: 'author3' },
    { id: 4, title: 'item4', collaction: 'collaction4', author: 'author4' },
    { id: 5, title: 'item5', collaction: 'collaction5', author: 'author5' },
    { id: 6, title: 'item1', collaction: 'collaction1', author: 'author1' },
    { id: 7, title: 'item2', collaction: 'collaction2', author: 'author2' },
    { id: 8, title: 'item3', collaction: 'collaction3', author: 'author3' },
    { id: 9, title: 'item4', collaction: 'collaction4', author: 'author4' },
    { id: 10, title: 'item5', collaction: 'collaction5', author: 'author5' },
    { id: 11, title: 'item4', collaction: 'collaction4', author: 'author4' },
    { id: 12, title: 'item5', collaction: 'collaction5', author: 'author5' },
  ]

  const handleClose = () => setShowModal(false)

  const modalContent = <AddCollectionForm handleClose={handleClose} />

  return (
    <>
      #{id} CollectionPage
      <Toolbar props={{ setShowModal }} />
      <ItemsList data={data} type="item" />
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default CollectionPage
