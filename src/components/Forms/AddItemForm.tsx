import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// import { useTranslation } from 'react-i18next'
import { Alert, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import extractItemFields from '../../utils/extractItemFields'
import generateFieldValues from '../../utils/generateFieldValues'
import getValueFromFieldName from '../../utils/getValueFromFieldName'
import { createItem } from '../../http/itemApi'
import MySpinner from '../../common/MySpinner'
import { getCollectionItems } from '../../store/itemsReducer'
import { showErrorToast, showSuccessToast } from '../../utils/showToest'
import { checkUser } from '../../store/userReducer'

function AddItemForm({ handleClose }: any) {
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
  const dispatch = useDispatch()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    valueKey: string
  ) => {
    const newFields = { ...fieldValues, [valueKey]: event.target.value }
    setFieldValues(newFields)
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (Object.values(fieldValues).includes(''))
      return setError('Fill the all required fields')
    setIsLoading(true)
    setError('')
    try {
      await createItem({ fieldValues, fieldNames, collectionId, userId })
      handleClose()
      showSuccessToast('Item created successfully!')
      dispatch(getCollectionItems(collectionId) as any)
    } catch (e: any) {
      showErrorToast(e)
      console.log(e)
    }
    setIsLoading(false)
    dispatch(checkUser() as any)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ mt: 3 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          Add new item
        </Typography>
        {isLoading && <MySpinner />}
        {error && <Alert severity="warning">{error}</Alert>}
        <Grid container spacing={2}>
          {Object.entries(fieldNames).map(([key, value]) => {
            const valueKey = getValueFromFieldName(key)
            return (
              <Grid item xs={12} key={key}>
                <TextField
                  required
                  autoFocus={value === 'Name'}
                  fullWidth
                  margin="dense"
                  id={key}
                  label={value as any}
                  variant="outlined"
                  value={fieldValues[valueKey]}
                  onChange={(e: any) => handleChange(e, valueKey)}
                />
              </Grid>
            )
          })}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>Сancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Add Item
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddItemForm
