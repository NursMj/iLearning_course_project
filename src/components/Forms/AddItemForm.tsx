import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// import { useTranslation } from 'react-i18next'
import {
  Alert,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import extractItemFields from '../../utils/extractItemFields'
import generateFieldValues from '../../utils/generateFieldValues'
import getValueFromFieldName from '../../utils/getValueFromFieldName'
import { createItem, updateItem } from '../../http/itemApi'
import MySpinner from '../../common/MySpinner'
import { getCollectionItems, getCurrentItem } from '../../store/itemsReducer'
import { showErrorToast, showSuccessToast } from '../../utils/showToest'
import { checkUser } from '../../store/userReducer'
import TagInput from '../TagInput/TagInpit'

const getFildType = (key: string) => {
  if (key.includes('integer')) return 'number'
  if (key.includes('date')) return 'date'
  return 'text'
}

function AddItemForm({ handleClose, itemId }: any) {
  // const { t } = useTranslation()
  const collection = useSelector(
    (state: any) => state.collections.currentCollection.data
  )
  const collectionId = collection.id
  const userId = collection.UserId
  const fieldNames: any = extractItemFields(collection)
  const generatedFieldValues = generateFieldValues(fieldNames)
  const [fieldValues, setFieldValues] = useState(generatedFieldValues)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState([{ id: 'Cool', text: 'Cool' }])
  const currentItem = useSelector((state: any) => state.items.currentItem.data)
  const currentfieldValues = useSelector(
    (state: any) => state.items.currentItem.fieldValues
  )
  const currentTags = useSelector((state: any) => state.items.currentItem.tags)
  const currentIsLoading = useSelector(
    (state: any) => state.items.currentItem.isLoading
  )
  const dispatch = useDispatch()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    valueKey: string
  ) => {
    const newFields = {
      ...fieldValues,
      [valueKey as any]: !valueKey.includes('boolean')
        ? event.target.value
        : event.target.checked,
    }
    setFieldValues(newFields)
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (Object.values(fieldValues).includes(''))
      return setError('Fill the all required fields')
    setIsLoading(true)
    setError('')
    try {
      let res
      if (itemId) {
        res = await updateItem({ fieldValues, userId, tags }, currentItem.id)
      } else {
        res = await createItem({
          fieldValues,
          fieldNames,
          collectionId,
          userId,
          tags,
        })
      }
      handleClose()
      showSuccessToast(res.message)
      dispatch(getCollectionItems(collectionId) as any)
    } catch (e: any) {
      showErrorToast(e)
      console.log(e)
    }
    setIsLoading(false)
    dispatch(checkUser() as any)
  }

  useEffect(() => {
    if (itemId) dispatch(getCurrentItem(itemId) as any)
  }, [])

  useEffect(() => {
    if (itemId) {
      setFieldValues(currentfieldValues || '')
      setTags(currentTags.map((t: any) => ({ id: t.name, text: t.name })) || '')
    }
  }, [currentIsLoading])

  if (itemId && currentIsLoading) return <MySpinner />

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ mt: 3 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          {itemId ? 'Edit item' : 'Add new item'}
        </Typography>
        {isLoading && <MySpinner />}
        {error && <Alert severity="warning">{error}</Alert>}
        <Grid container spacing={2} sx={{ pt: 2 }}>
          {Object.entries(fieldNames).map(([key, value]) => {
            const valueKey = getValueFromFieldName(key)
            const type = getFildType(valueKey)
            return (
              <Grid item xs={12} key={key}>
                {!key.includes('boolean') ? (
                  <TextField
                    required
                    autoFocus={value === 'Name'}
                    fullWidth
                    type={type}
                    multiline={key.includes('multiline')}
                    minRows={2}
                    maxRows={6}
                    id={key}
                    label={value as any}
                    value={fieldValues[valueKey]}
                    onChange={(e: any) => handleChange(e, valueKey)}
                  />
                ) : (
                  <FormControlLabel
                    label={value as any}
                    control={
                      <Checkbox
                        checked={fieldValues[valueKey]}
                        onChange={(e: any) => handleChange(e, valueKey)}
                      />
                    }
                  />
                )}
              </Grid>
            )
          })}
          <Grid item xs={12}>
            <TagInput tags={tags} setTags={setTags} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>Сancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          {itemId ? 'Save chages' : 'Add Item'}
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddItemForm
