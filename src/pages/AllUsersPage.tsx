import { Container } from '@mui/material'
import ItemsTable from '../components/ItemsTable'
import { useDispatch, useSelector } from 'react-redux'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'
import MySpinner from '../common/MySpinner'
import { useEffect } from 'react'
import { getAllUsers } from '../store/userReducer'
import DropdownMenu from '../components/DropdownMenu'

function AllUsersPage() {
  const allUsers = useSelector((state: any) => state.user.allUsers.data)
  const isLoading = useSelector((state: any) => state.user.allUsers.isLoading)
  // const error = useSelector((state: any) => state.user.allUsers.error)
  const dispatch = useDispatch()

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id' },
    { field: 'email', headerName: 'Email' },
    { field: 'name', headerName: 'Name' },
    { field: 'blocked', headerName: 'Blocked' },
    { field: 'role', headerName: 'Role' },
    {
      field: 'actions',
      headerName: 'Actions',
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <DropdownMenu user={row} />
      },
    },
  ]

  useEffect(() => {
    dispatch(getAllUsers() as any)
  }, [])

  if (isLoading) return <MySpinner />

  return (
    <Container>
      <ItemsTable rows={allUsers} columns={columns} />
    </Container>
  )
}

export default AllUsersPage
