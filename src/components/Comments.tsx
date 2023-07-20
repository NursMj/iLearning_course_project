import { useState, useEffect } from 'react'
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { getItemComments } from '../store/commentsReducer'
import MySpinner from '../common/MySpinner'
import { createComment, deleteComment } from '../http/commentApi'

const Comments = ({ itemId, socket }: any) => {
  const comments = useSelector((state: any) => state.comments.comments.data)
  const isLoading = useSelector(
    (state: any) => state.comments.comments.isLoading
  )
  const error = useSelector((state: any) => state.comments.comments.error)
  const [newComment, setNewComment] = useState('')
  const userId = useSelector((state: any) => state.user.user.data.id)
  const [newLoading, setNewLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItemComments(itemId) as any)
  }, [itemId])

  useEffect(() => {
    socket.on('commentCreated', () => {
      dispatch(getItemComments(itemId) as any)
    })
  }, [socket])

  const handleAddComment = async () => {
    setNewLoading(true)
    try {
      await createComment({ text: newComment, itemId })
      setNewComment('')
      dispatch(getItemComments(itemId) as any)
    } catch (error) {
      console.error('Error adding comment:', error)
    }
    setNewLoading(false)
  }

  const handleDeleteComment = async (commentId: number) => {
    setDeleteLoading(true)
    setDeletingId(commentId)
    try {
      await deleteComment(commentId)
      dispatch(getItemComments(itemId) as any)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
    setDeleteLoading(false)
    setDeletingId(0)
  }

  if (isLoading) return <MySpinner />
  if (error) return <span>Faild to load comments</span>

  return (
    <div>
      <Typography variant="h5">Comments</Typography>
      <List sx={{ display: 'grid', gap: 1 }}>
        {comments.map((comment: any) => (
          <Paper key={comment.id}>
            <ListItem>
              <ListItemText
                secondary={`Posted by: ${comment.User.name}`}
                primary={comment.text}
              />
              <ListItemSecondaryAction>
                {userId === comment.User.id && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    {deleteLoading && deletingId === comment.id && (
                      <MySpinner />
                    )}
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </List>
      <div>
        {newLoading && <MySpinner />}
        <TextField
          sx={{ mb: 2, mt: 2 }}
          label="Add Comment"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </div>
    </div>
  )
}

export default Comments
