import { IconButton, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import MyModalDialog from '../common/MyModalDialog'
import AddTopicForm from '../components/Forms/AddTopicForm'
import { getTopics, removeTopic } from '../store/topicsReducer'
import MySpinner from '../common/MySpinner'
import Toolbar from '../components/ToolBar'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'
import ItemsTable from '../components/ItemsTable'
import DeleteIcon from '@mui/icons-material/Delete'

function TopicsPage() {
  const topics = useSelector((state: any) => state.topics.topics.data)
  const isLoading = useSelector((state: any) => state.topics.topics.isLoading)
  const isDeleteLoading = useSelector(
    (state: any) => state.topics.topicDelete.isLoading
  )
  //   const error = useSelector((state: any) => state.topics.topics.data)
  const [showModal, setShowModal] = useState(false)
  const [deletingTopic, setDeletingTopic] = useState('')
  const dispatch = useDispatch()

  const modalContent = <AddTopicForm handleClose={handleClose} />

  const handleDelete = async (row: any) => {
    setDeletingTopic(row.name)
    await dispatch(removeTopic(row.id) as any)
    dispatch(getTopics() as any)
    setDeletingTopic('')
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Topic name', flex: 2 },
    {
      field: 'actions',
      headerName: 'Actions',
      disableColumnMenu: true,
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return (
          <>
            {isDeleteLoading && deletingTopic === row.name && <MySpinner />}
            <IconButton onClick={() => handleDelete(row)}>
              <DeleteIcon />
            </IconButton>
          </>
        )
      },
    },
  ]

  function handleClose() {
    setShowModal(false)
  }

  useEffect(() => {
    dispatch(getTopics() as any)
  }, [])

  if (isLoading) return <MySpinner />

  return (
    <Container>
      <Typography variant="h4">Topics list</Typography>
      <Toolbar props={{ setShowModal, isOwner: true }} />
      <ItemsTable rows={topics} columns={columns} />
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </Container>
  )
}

export default TopicsPage
