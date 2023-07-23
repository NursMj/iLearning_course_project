import { useParams } from 'react-router-dom'
import { getTagItems } from '../store/itemsReducer'
import ItemsGrid from '../components/ItemsGrid'
import MySpinner from '../common/MySpinner'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function TagPage() {
  const tagId = Number(useParams().id)
  const dispatch = useDispatch()
  const items = useSelector(
    (state: any) => state.items.items.data
  )
  const tag = useSelector(
    (state: any) => state.items.items.tag
  )
  const isLoading = useSelector(
    (state: any) => state.items.items.isLoading
  )
  const error = useSelector((state: any) => state.items.items.error)

  useEffect(() => {
    dispatch(getTagItems(tagId) as any)
  }, [tagId])

  if (isLoading) return <MySpinner />

  return (
    <>
      <Box>
        <Typography variant="h5">Items with tag '{tag.name}'</Typography>
      </Box>
      <hr />
      {isLoading ? (
        <MySpinner />
      ) : (
        <ItemsGrid data={items} error={error} type="item" /> 
      )}
    </>
  )
}

export default TagPage
