import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import MyLink from '../common/MyLink'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/material'
import { refreshCollections, refreshItems } from '../utils/refreshers'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../http/itemApi'
import { useState } from 'react'
import MySpinner from '../common/MySpinner'
import { toast } from 'react-toastify'
import { deleteCollection } from '../http/collectionApi'

function ItemCard(props: any) {
  const { item, type } = props
  const path = `/${type}/${item.id}`
  const isItem = type === 'item'
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const deleteFunction = isItem ? deleteItem : deleteCollection
  const refreshFunction = isItem ? refreshItems : refreshCollections
  const canChange = false

  async function handleDelete(e: any) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await deleteFunction(item.id)
      refreshFunction(dispatch, item.CollectionId)
      toast.info(res.message, {
        autoClose: 1500,
      })
    } catch (e: any) {
      console.log(e.message)
    }
    setIsLoading(false)
  }

  function handleEdit(e: any) {
    e.preventDefault()
    alert('Todo hadle edit ')
  }

  return (
    <MyLink
      to={path}
      content={
        <Card sx={{ minWidth: 275, position: 'relative' }}>
          <CardContent>
            {canChange && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  display: 'flex',
                  gap: 1,
                }}
              >
                {isLoading && <MySpinner />}
                <EditIcon onClick={handleEdit} />
                <DeleteIcon onClick={handleDelete} />
              </Box>
            )}
            <Typography variant="h5" component="div">
              {item.requiredField1_value || item.name}
            </Typography>
            {isItem && (
              <>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item?.collaction}
                </Typography>
                <Typography variant="body2">{item?.author}</Typography>
              </>
            )}
          </CardContent>
        </Card>
      }
    />
  )
}

export default ItemCard
