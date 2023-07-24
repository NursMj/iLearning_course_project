import { useLocation, useParams } from 'react-router-dom'
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
import ItemsTable from '../components/ItemsTable'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'
import ItemActionMenu from '../components/ActionMenu/ItemActionMenu'
import MyLink from '../common/MyLink'
import { ITEM_ROUTE } from '../utils/consts'

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
  const location = useLocation()
  const actionsVisible =
    (location.pathname.includes('collection') ||
      location.pathname.includes('user')) &&
    isOwner
  const [itemId, setItemId] = useState(0)
  const isItemTable = useSelector((state: any) => state.dataView.isItemTable)
  const columns: GridColDef[] = [
    {
      field: 'Name',
      headerName: 'Item name',
      width: 200,
      flex: 2,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return (
          <MyLink
            to={ITEM_ROUTE + '/' + row.id}
            content={row.Name}
          />
        )
      },
    },
    {
      field: 'collection',
      headerName: 'Collection',
      filterable: false,
      flex: 2,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <Typography>{row.collection}</Typography>
      },
    },
    {
      field: 'author',
      headerName: 'Author',
      filterable: false,
      flex: 2,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return (
          <Typography>
            {row.author}
          </Typography>
        )
      },
    },
    {
      field: 'likesCount',
      headerName: 'Likes count',
      flex: 1,
      type: 'number',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 70,
      filterable: false,
      disableColumnMenu: true,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return (
          <ItemActionMenu
            item={row}
            setShowModal={handleOpenEdditForm}
            type="item"
          />
        )
      },
    },
  ]
  const MOBILE_COLUMNS = {
    author: false,
    collection: false,
    actions: actionsVisible,
  }
  const ALL_COLUMNS = {
    actions: actionsVisible,
  }

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
    dispatch(getCollectionItems(collectionId) as any)
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
      <Toolbar
        props={{ setShowModal, isOwner, exportData: true, showDataView: true }}
      />
      {itemsLoading ? (
        <MySpinner />
      ) : (
        <>
          {isItemTable ? (
            <ItemsTable
              error={itemsError}
              rows={items}
              columns={columns}
              MOBILE_COLUMNS={MOBILE_COLUMNS}
              ALL_COLUMNS={ALL_COLUMNS}
            />
          ) : (
            <ItemsGrid
              data={items}
              setShowModal={handleOpenEdditForm}
              error={itemsError}
              actionsVisible={actionsVisible}
              type="item"
            />
          )}
        </>
      )}
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </>
  )
}

export default CollectionPage
