import { Button, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useSelector, useDispatch } from 'react-redux'
import { setTopics } from '../store/topicsReducer'
import { useEffect } from 'react'
import { fetchTopics } from '../http/topicsApi'

function AdminPage() {
  const topics = useSelector((state: any) => state.topics.topics)
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetchTopics().then((data) => dispatch(setTopics(data)))
  }, [])

  return (
    <Container>
      <Button>Add topic</Button>
      <Typography>Topics list</Typography>
      {topics.length > 0 ? (
        topics.map((t: any) => {
          return <p key={t.id}>{t.name}</p>
        })
      ) : (
        <span>Topics list is empty</span>
      )}
    </Container>
  )
}

export default AdminPage
