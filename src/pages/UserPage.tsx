import { useState } from 'react'
import { Typography, Alert } from '@mui/material'
import ItemsList from '../components/ItemsList'
import Toolbar from '../components/ToolBar'
import { useTranslation } from 'react-i18next'
import AddCollectionForm from '../components/Forms/AddCollectionForm'
import MyModalDialog from '../common/MyModalDialog'
import MySpinner from '../common/MySpinner'
import { useSelector } from 'react-redux'

function UserPage() {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const user = useSelector((state: any) => state.user.user)
  const collections = useSelector((state: any) => state.collections.collections)
  const loading = useSelector((state: any) => state.collections.loading)
  const error = useSelector((state: any) => state.collections.error)

  const handleClose = () => setShowModal(false)

  const modalContent = (
    <AddCollectionForm
      handleClose={handleClose}
    />
  )

  return (
    <>
      <Typography variant="h4" className="mb-3">
        {t('user.title')}, {user.name}
      </Typography>
      <Toolbar props={{ setShowModal }} />
      {error && <Alert>{error}</Alert>}
      {loading && <MySpinner />}
      {!loading && <ItemsList data={collections} type="collection" />}
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default UserPage
