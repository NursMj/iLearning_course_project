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
import { useEffect, useState } from 'react'
import { createCollection, updateCollection } from '../../http/collectionApi'
import MySpinner from '../../common/MySpinner'
import getFields from '../../utils/getFields'
import {
  getCurrentCollection,
  getUserCollections,
} from '../../store/collectionsReducer'
import { getTopics } from '../../store/topicsReducer'
import { showErrorToast, showSuccessToast } from '../../utils/showToest'

function AddCollectionForm({ handleClose, collectionId }: any) {
  const topics = useSelector((state: any) => state.topics.topics.data)
  const topicsLoading = useSelector(
    (state: any) => state.topics.topics.isLoading
  )
  const userId = useSelector(
    (state: any) => state.collections.collections.owner.id
  )
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState('')
  const [fields, setFields] = useState({
    integer: [],
    string: [],
    multiline: [],
    boolean: [],
    date: [],
  })
  const collection = useSelector(
    (state: any) => state.collections.currentCollection.data
  )
  const collectionIsLoading = useSelector(
    (state: any) => state.collections.currentCollection.isLoading
  )
  const dispatch = useDispatch()
  const types = ['integer', 'string', 'multiline', 'boolean', 'date']

  function handleFieldsChange(newFields: string[], type: string): void {
    setFields((prevState: any) => {
      if (type === 'integer') return { ...prevState, integer: newFields }
      if (type === 'string') return { ...prevState, string: newFields }
      if (type === 'multiline') return { ...prevState, multiline: newFields }
      if (type === 'boolean') return { ...prevState, boolean: newFields }
      if (type === 'date') return { ...prevState, date: newFields }
    })
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (name && desc && selectedTopicId) {
      setIsLoading(true)
      setError('')
      const formData = new FormData()
      formData.append('img', file)
      formData.append('name', name)
      formData.append('desc', desc)
      formData.append('topicId', selectedTopicId)
      formData.append('userId', userId)
      console.log(userId)
      try {
        let res
        if (collectionId) {
          res = await updateCollection(formData, collectionId)
        } else {
          formData.append('itemFields', JSON.stringify(getFields(fields)))
          res = await createCollection(formData)
        }
        handleClose()
        showSuccessToast(res.message)
        dispatch(getUserCollections(userId) as any)
      } catch (e: any) {
        showErrorToast(e)
        console.log(e)
      }
      setIsLoading(false)
    } else {
      setError('Fill in required fields')
    }
  }

  useEffect(() => {
    if (collectionId) dispatch(getCurrentCollection(collectionId) as any)
    dispatch(getTopics() as any)
  }, [])

  useEffect(() => {
    if (collectionId) {
      setName(collection.name || '')
      setSelectedTopicId(collection?.Topic?.id || '')
      setDesc(collection.desc || '')
    }
  }, [collectionIsLoading])

  if (collectionId && collectionIsLoading) return <MySpinner />

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ mt: 3 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          {collectionId ? 'Eddit collection' : t('modal.collaction_form.title')}
        </Typography>
        {error && <Alert severity="warning">{error}</Alert>}
        {isLoading && <MySpinner />}
        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              autoFocus
              fullWidth
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
              select
              label="Topic"
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value as any)}
            >
              {topicsLoading ? (
                <MySpinner />
              ) : (
                topics.map((t: any) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="collection-description"
              required
              label="Description (supports Markdown)"
              multiline
              fullWidth
              minRows={2}
              maxRows={8}
              value={desc}
              onChange={(e: any) => setDesc(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageUploader file={file} setFile={setFile} />
          </Grid>
        </Grid>
        <hr />
        {!collectionId && (
          <>
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', margin: '20px 0' }}
            >
              Collection item fields
            </Typography>
            <Grid container spacing={2}>
              {types.map((type) => (
                <Grid item xs={12} key={type}>
                  <DynamicInputFields
                    onChange={handleFieldsChange}
                    type={type}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>Сancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          {collectionId ? 'Save chages' : 'Add collection'}
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddCollectionForm
