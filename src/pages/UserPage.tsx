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
import { useLocation, useParams } from 'react-router-dom'
import { getUserCollections } from '../store/collectionsReducer'
import { checkUser } from '../store/userReducer'
import ItemsTable from '../components/ItemsTable'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'
import ItemActionMenu from '../components/ActionMenu/ItemActionMenu'
import MyLink from '../common/MyLink'
import { COLLECTION_ROUTE } from '../utils/consts'

function UserPage() {
  const ownerId = Number(useParams().id)
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const isItemTable = useSelector((state: any) => state.dataView.isItemTable)
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
  const location = useLocation()
  const actionsVisible =
    (location.pathname.includes('collection') ||
      location.pathname.includes('user')) &&
    isOwner
  const dispatch = useDispatch()
  const [collectionId, setCollectionId] = useState(0)
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Collection name',
      width: 200,
      flex: 2,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return (
          <MyLink to={COLLECTION_ROUTE + '/' + row.id} content={row.name} />
        )
      },
    },

    {
      field: 'author',
      headerName: 'Author',
      flex: 2,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return (
          <Typography>
            {row?.User?.name || <em>User has been deleted</em>}
          </Typography>
        )
      },
    },
    {
      field: 'amount',
      headerName: 'Items amount',
      flex: 1,
      type: 'number',
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <Typography>{row?.Items?.length}</Typography>
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 70,
      disableColumnMenu: true,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return (
          <ItemActionMenu
            item={row}
            setShowModal={handleOpenEdditForm}
            type="collection"
          />
        )
      },
    },
  ]
  const MOBILE_COLUMNS = {
    amount: false,
    actions: actionsVisible,
  }
  const ALL_COLUMNS = {
    actions: actionsVisible,
  }

  const handleClose = () => {
    setCollectionId(0)
    setShowModal(false)
  }
  const handleOpenEdditForm = (id: number) => {
    setCollectionId(id)
    setShowModal(true)
  }

  useEffect(() => {
    dispatch(checkUser() as any)
    dispatch(getUserCollections(ownerId) as any)
  }, [ownerId])

  const modalContent = (
    <AddCollectionForm handleClose={handleClose} collectionId={collectionId} />
  )

  return (
    <>
      <Typography variant="h4" className="mb-3">
        {t('user.title')} {contentOwner.name}
      </Typography>
      <hr />
      <Toolbar props={{ setShowModal, isOwner }} />
      {loading && <MySpinner />}
      {!loading && (
        <>
          {isItemTable ? (
            <ItemsTable
              error={error}
              rows={collections}
              columns={columns}
              MOBILE_COLUMNS={MOBILE_COLUMNS}
              ALL_COLUMNS={ALL_COLUMNS}
            />
          ) : (
            <ItemsGrid
              data={collections}
              setShowModal={handleOpenEdditForm}
              error={error}
              actionsVisible={actionsVisible}
              type="collection"
            />
          )}
        </>
      )}
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default UserPage
