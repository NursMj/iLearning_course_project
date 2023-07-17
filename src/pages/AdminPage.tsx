import { Box, Paper } from '@mui/material'
import Container from '@mui/material/Container'
import MyLink from '../common/MyLink'
import { ALL_USERS_ROUTE, TOPICS_ROUTE } from '../utils/consts'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkUser } from '../store/userReducer'

function AdminPage() {
  const paperStyle = {
    p: 3
  }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUser() as any)
  }, [])

  return (
    <Container>
      <Box sx={{display: 'flex', gap: 2}}>
        <MyLink to={TOPICS_ROUTE} content={<Paper sx={paperStyle}>Manage topics</Paper>} />
        <MyLink
          to={ALL_USERS_ROUTE}
          content={<Paper sx={paperStyle}>Manage all users</Paper>}
        />
      </Box>
    </Container>
  )
}

export default AdminPage