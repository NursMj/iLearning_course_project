import { Box, Paper } from '@mui/material'
import Container from '@mui/material/Container'
// import { useSelector } from 'react-redux'
// import { setTopics } from '../store/topicsReducer'
// import { useState } from 'react'
// import { fetchTopics } from '../http/topicsApi'
import MyLink from '../common/MyLink'
import { ALL_USERS_ROUTE, TOPICS_ROUTE } from '../utils/consts'

function AdminPage() {
  const paperStyle = {
    p: 2
  }

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
