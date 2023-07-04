import { useState } from 'react'
import { Typography } from '@mui/material'
import ItemsList from '../components/ItemsList'
import Toolbar from '../components/ToolBar'
import { useTranslation } from 'react-i18next'
import AddCollectionForm from '../components/AddCollectionForm'
import MyModalDialog from '../components/MyModalDialog'

function UserPage() {
  const { t } = useTranslation()
  const collectionData = [
    { id: 1, title: 'collection1' },
    { id: 2, title: 'collection2' },
    { id: 3, title: 'collection3' },
    { id: 4, title: 'collection4' },
    { id: 5, title: 'collection5' },
  ]
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)

  const modalContent = <AddCollectionForm handleClose={handleClose} />

  return (
    <>
      <Typography variant="h4" className="mb-3">
        {t('user.title')}
      </Typography>
      <Toolbar props={{ setShowModal }} />
      <ItemsList data={collectionData} type="collection" />
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default UserPage
