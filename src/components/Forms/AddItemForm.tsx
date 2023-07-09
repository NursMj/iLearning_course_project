import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// import { useTranslation } from 'react-i18next'
import { Alert, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { createTopic } from '../../http/topicsApi'
import { toast } from 'react-toastify'

function AddItemForm({ handleClose, refreshTopics }: any) {
  // const { t } = useTranslation()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: any) {
    e.preventDefault()
    if(!name) return setError('Fill the field')
    await createTopic(name)
    setError('')
    handleClose()
    refreshTopics()
    toast.success('Topic created successfully!', {
        autoClose: 1500
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ mt: 3 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          Add new item
        </Typography>
        {error && <Alert severity="warning">{error}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
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
        <Button variant="contained" onClick={handleSubmit}>
          Add Topic
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddItemForm