import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import ItemsGrid from '../components/ItemsGrid'
import Toolbar from '../components/ToolBar'
import { useTranslation } from 'react-i18next'
import AddCollectionForm from '../components/Forms/AddCollectionForm'
import MyModalDialog from '../common/MyModalDialog'
import MySpinner from '../common/MySpinner'
import { useDispatch, useSelector } from 'react-redux'
import checkIsOwner from '../utils/checkIsOwner'
import { useParams } from 'react-router-dom'
import { getUserCollections } from '../store/collectionsReducer'
import { checkUser } from '../store/userReducer'

function UserPage() {
  const ownerId = Number(useParams().id)
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const user = useSelector((state: any) => state.user.user.data)
  const contentOwner = useSelector(
    (state: any) => state.collections.collections.owner
  )
  const collections = useSelector(
    (state: any) => state.collections.collections.data
  )
  const loading = useSelector(
    (state: any) => state.collections.collections.isloading
  )
  const error = useSelector((state: any) => state.collections.collections.error)
  const isOwner = checkIsOwner(user, ownerId)
  const dispatch = useDispatch()

  const handleClose = () => setShowModal(false)

  useEffect(() => {
    dispatch(checkUser() as any)
    dispatch(getUserCollections(ownerId) as any)
  }, [ownerId])

  const modalContent = <AddCollectionForm handleClose={handleClose} />

  return (
    <>
      <Typography variant="h4" className="mb-3">
        {t('user.title')} {contentOwner.name}
      </Typography>
      <hr />
      <Toolbar props={{ setShowModal, isOwner }} />
      {loading && <MySpinner />}
      {!loading && <ItemsGrid data={collections} error={error} type="collection" />}
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default UserPage
