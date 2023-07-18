import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCurrentItem } from '../store/itemsReducer'
import { useDispatch, useSelector } from 'react-redux'
import MySpinner from '../common/MySpinner'
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { createlike, deleteLike } from '../http/likeApi'

function ItemPage() {
  const id = Number(useParams().id)
  const dispatch = useDispatch()
  const userId = useSelector((state: any) => state.user.user.data.id)
  const item = useSelector((state: any) => state.items.currentItem.data)
  const likes = useSelector((state: any) => state.items.currentItem.likes)
  const myLike = item.myLike
  const isLodaing = useSelector(
    (state: any) => state.items.currentItem.isLodaing
  )
  // const error = useSelector((state: any) => state.items.currentItem.error)
  const fieldNames = useSelector(
    (state: any) => state.items.currentItem.fieldNames
  )
  const fieldValues = useSelector(
    (state: any) => state.items.currentItem.fieldValues
  )
  const pairs = Object.entries(fieldNames).map(([key, name]) => {
    return {
      name,
      value: key.includes('date')
        ? fieldValues[`${key.replace('_name', '_value')}`].slice(0, -14)
        : fieldValues[`${key.replace('_name', '_value')}`],
    }
  })

  const handleLike = async () => {
    try {
      await createlike({ itemId: id, userId })
      dispatch(getCurrentItem(id) as any)
    } catch (error) {
      console.error('Error liking item:', error)
    }
  }

  const handleUnlike = async () => {
    try {
      await deleteLike(myLike.id)
      dispatch(getCurrentItem(id) as any)
    } catch (error) {
      console.error('Error unliking item:', error)
    }
  }

  useEffect(() => {
    dispatch(getCurrentItem(id) as any)
  }, [id])

  if (isLodaing) return <MySpinner />

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h3">{item.requiredField1_value}</Typography>
            <Typography>
              <b>Author:</b> {item.Collection?.User.name}
            </Typography>
            <Typography>
              <b>Collection:</b> {item.Collection?.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {myLike ? (
              <IconButton onClick={handleUnlike}>
                <ThumbUpAltIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleLike}>
                <ThumbUpOffAltIcon />
              </IconButton>
            )}
            <span>{likes}</span>
          </Box>
        </Box>

        <hr />
        <Grid container gap={2}>
          {pairs.map((field: any, i: number) => (
            <Grid item width={'100%'} key={i}>
              <Typography>
                <b>{field.name}:</b>{' '}
                {typeof field.value !== 'boolean' ? (
                  field.value
                ) : field.value === true ? (
                  <CheckBoxIcon />
                ) : (
                  <IndeterminateCheckBoxIcon />
                )}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ItemPage
