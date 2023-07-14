import { Button, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import MyModalDialog from '../common/MyModalDialog'
import AddTopicForm from '../components/Forms/AddTopicForm'
import { getTopics } from '../store/topicsReducer'
import MySpinner from '../common/MySpinner'

function TopicsPage() {
  const topics = useSelector((state: any) => state.topics.topics.data)
  const isLoading = useSelector((state: any) => state.topics.topics.isLoading)
//   const error = useSelector((state: any) => state.topics.topics.data)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const modalContent = <AddTopicForm handleClose={handleClose} />

  function handleClose() {
    setShowModal(false)
  }

  useEffect(() => {dispatch(getTopics() as any)}, [])

  if (isLoading) return <MySpinner />

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

export default TopicsPage
