import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@mui/material'
import ImageUploader from './ImageUploder'
import DynamicInputFields from './DynamicInputField'
import { useSelector } from 'react-redux'

function AddCollectionForm({ handleClose }: any) {
  const topics = useSelector((state: any) => state.topics.topics)
  const { t } = useTranslation()

  return (
    <>
      <DialogContent sx={{ mt: 3 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          {t('modal.collaction.title')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              id="collection-name"
              label="Collection name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="topic-select"
              required
              fullWidth
              margin="dense"
              select
              label="Topic"
              defaultValue={topics[0].title}
            >
              {topics.map((t: any) => (
                <MenuItem key={t.id} value={t.title}>
                  {t.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="collection-description"
              required
              label="Multiline"
              multiline
              fullWidth
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageUploader />
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ textAlign: 'center', margin: '20px 0' }}>
          Collection item fields
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DynamicInputFields type="Integer" />
          </Grid>
          <Grid item xs={12}>
            <DynamicInputFields type="String" />
          </Grid>
          <Grid item xs={12}>
            <DynamicInputFields type="Multiline" />
          </Grid>
          <Grid item xs={12}>
            <DynamicInputFields type="Boolean" />
          </Grid>
          <Grid item xs={12}>
            <DynamicInputFields type="Date" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>
          Сancel
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Add collection
        </Button>
      </DialogActions>
    </>
  )
}

export default AddCollectionForm