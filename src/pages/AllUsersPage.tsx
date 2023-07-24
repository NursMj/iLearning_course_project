import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import ItemsTable from '../components/ItemsTable'
import { useDispatch, useSelector } from 'react-redux'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'
import MySpinner from '../common/MySpinner'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../store/userReducer'
import UserActionMenu from '../components/ActionMenu/UserActionMenu'
import Toolbar from '../components/ToolBar'
import MyModalDialog from '../common/MyModalDialog'
import { useTranslation } from 'react-i18next'
import { showErrorToast, showSuccessToast } from '../utils/showToest'
import { registration } from '../http/userApi'

function AllUsersPage() {
  const allUsers = useSelector((state: any) => state.user.allUsers.data)
  const isLoading = useSelector((state: any) => state.user.allUsers.isLoading)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [addError, setAddError] = useState('')
  const [isAddLoading, setIsAddLoading] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email' },
    { field: 'name', headerName: 'Name' },
    { field: 'blocked', headerName: 'Blocked' },
    { field: 'role', headerName: 'Role' },
    {
      field: 'actions',
      headerName: 'Actions',
      disableColumnMenu: true,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <UserActionMenu user={row} />
      },
    },
  ]

  const handleClose = () => {
    setShowModal(false)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (password && email && name) {
      setIsAddLoading(true)
      setAddError('')
      try {
        await registration(name, email, password, 'add-user')
        dispatch(getAllUsers() as any)
        handleClose()
        showSuccessToast('User added successfully!')
      } catch (e: any) {
        showErrorToast(e)
      }
      setIsAddLoading(false)
    } else {
      setAddError('Fill in required fields')
    }
  }

  const modalContent = (
    <>
      <Box
        sx={{
          p: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isAddLoading && <MySpinner />}
        {addError && <Alert severity="warning">{addError}</Alert>}

        <Typography component="h1" variant="h5">
          Add new user
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                required
                fullWidth
                id="name"
                label={t('login_form.name')}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t('login_form.email')}
                name="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={t('login_form.password')}
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </>
  )

  useEffect(() => {
    dispatch(getAllUsers() as any)
  }, [])

  if (isLoading) return <MySpinner />

  return (
    <Container>
      <Typography variant="h4">All users list</Typography>
      <Toolbar props={{ setShowModal, isOwner: true }} />
      <ItemsTable rows={allUsers} columns={columns} />
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </Container>
  )
}

export default AllUsersPage
