import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useTranslation } from 'react-i18next'
import { Alert, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { createTopic } from '../../http/topicsApi'
import { useDispatch } from 'react-redux'
import { getTopics } from '../../store/topicsReducer'
import { showSuccessToast } from '../../utils/showToest'

function AddTopicForm({ handleClose }: any) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (!name) return setError('Fill the field')
    try {
      await createTopic(name)
      setError('')
      handleClose()
      dispatch(getTopics() as any)
      showSuccessToast('Topic created successfully!')
    } catch (e: any) {
      if (e.response) {
        setError(e.response.data.message)
      } else {
        setError(e.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ mt: 3 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          {t('modal.topic_form.title')}
        </Typography>
        {error && <Alert severity="warning">{error}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              autoFocus
              fullWidth
              id="topic-name"
              label="Topic name"
              variant="outlined"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>Сancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Add Topic
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddTopicForm
