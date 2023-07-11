import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { Alert, Grid, Typography } from '@mui/material'
import ImageUploader from '../ImageUploder'
import DynamicInputFields from '../DynamicInputField'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createCollection } from '../../http/collectionApi'
import { toast } from 'react-toastify'
import MySpinner from '../../common/MySpinner'
import { refreshCollections } from '../../utils/refreshers'
import getFields from '../../utils/getFields'

function AddCollectionForm({ handleClose }: any) {
  const topics = useSelector((state: any) => state.topics.topics)
  const userId = useSelector((state: any) => state.user.user.id)
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState({
    integer: [],
    string: [],
    multiline: [],
    boolean: [],
    date: [],
  })
  const dispatch = useDispatch()
  const types = ['integer', 'string', 'multiline', 'boolean', 'date']

  function handleFieldsChange(newFields: string[], type: string): void {
    setFields((prevState: any) => {
      if (type === 'integer') return { ...prevState, integer: newFields }
      if (type === 'string') return { ...prevState, string: newFields }
      if (type === 'multiline')
        return { ...prevState, multilineFields: newFields }
      if (type === 'boolean') return { ...prevState, boolean: newFields }
      if (type === 'date') return { ...prevState, date: newFields }
    })
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (name && desc && selectedTopicId) {
      setIsLoading(true)
      setError('')
      try {
        const topicId = selectedTopicId.toString()
        await createCollection({
          name,
          desc,
          topicId,
          userId,
          itemFields: getFields(fields),
        })
        handleClose()
        toast.success('Collection created successfully!', {
          autoClose: 1500,
        })
        refreshCollections(dispatch)
      } catch (e: any) {
        if (e.response) {
          setError(e.response.data.message)
        } else {
          setError(e.message)
        }
        console.log(e)
      }
      setIsLoading(false)
    } else {
      setError('Fill in required fields')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ mt: 3 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          {t('modal.collaction_form.title')}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {isLoading && <MySpinner />}
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
              value={name}
              onChange={(e: any) => setName(e.target.value)}
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
              defaultValue={topics[0].id}
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
            >
              {topics.map((t: any) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
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
              value={desc}
              onChange={(e: any) => setDesc(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageUploader />
          </Grid>
        </Grid>
        <hr />
        <Typography variant="h6" sx={{ textAlign: 'center', margin: '20px 0' }}>
          Collection item fields
        </Typography>
        <Grid container spacing={2}>
          {types.map((type) => (
            <Grid item xs={12} key={type}>
              <DynamicInputFields onChange={handleFieldsChange} type={type} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>Сancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Add collection
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddCollectionForm
