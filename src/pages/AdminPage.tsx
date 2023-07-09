import { Button, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
// import { setTopics } from '../store/topicsReducer'
import { useState } from 'react'
// import { fetchTopics } from '../http/topicsApi'
import MyModalDialog from '../common/MyModalDialog'
import AddTopicForm from '../components/Forms/AddTopicForm'

function AdminPage() {
  const topics = useSelector((state: any) => state.topics.topics)
  const [showModal, setShowModal] = useState(false)

  const modalContent = (
    <AddTopicForm handleClose={handleClose} />
  )

  function handleClose() {
    setShowModal(false)
  }

  return (
    <Container>
      <Button onClick={() => setShowModal(true)}>Add topic</Button>
      <Typography>Topics list</Typography>
      {topics.length > 0 ? (
        topics.map((t: any) => {
          return <p key={t.id}>{t.name}</p>
        })
      ) : (
        <span>Topics list is empty</span>
      )}
      <MyModalDialog props={{ showModal, handleClose, modalContent }} />
    </Container>
  )
}

export default AdminPage
