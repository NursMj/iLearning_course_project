import { useEffect, useState } from 'react'
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
import MyTag from '../common/MyTag'
import Comments from '../components/Comments'
import io from 'socket.io-client'
import MyLink from '../common/MyLink'

const socket = io(import.meta.env.VITE_API_URL)

function ItemPage() {
  const id = Number(useParams().id)
  const dispatch = useDispatch()
  const userId = useSelector((state: any) => state.user.user.data.id)
  const item = useSelector((state: any) => state.items.currentItem.data)
  const likes = useSelector((state: any) => state.items.currentItem.likes)
  const tags = useSelector((state: any) => state.items.currentItem.tags)
  const myLike = item.myLike
  const isLodaing = useSelector(
    (state: any) => state.items.currentItem.isLodaing
  )
  const [likeLoading, setLikeLoading] = useState(false)
  const notToShow = ['Name', 'collection', 'author', 'myLike', 'likesCount', 'id']

  const handleLike = async () => {
    setLikeLoading(true)
    try {
      myLike
        ? await deleteLike(myLike.id)
        : await createlike({ itemId: id, userId })
      dispatch(getCurrentItem(id) as any)
    } catch (error) {
      console.error('Error liking item:', error)
    }
    setLikeLoading(false)
  }

  useEffect(() => {
    dispatch(getCurrentItem(id) as any)
    socket.emit('joinItemRoom', id)
  }, [id])

  if (isLodaing) return <MySpinner />

  return (
    <>
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h3">{item.Name}</Typography>
              <Typography>
                <b>Author:</b>{' '}
                {item.Collection?.User ? (
                  item.Collection?.User.name
                ) : (
                  <em>User has been deleted</em>
                )}
              </Typography>
              <Typography>
                <b>Collection:</b>{' '}
                <MyLink
                  to={`/collection/${item.Collection?.id}`}
                  content={item.collection}
                />
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleLike}>
                {likeLoading ? (
                  <MySpinner />
                ) : myLike ? (
                  <ThumbUpAltIcon />
                ) : (
                  <ThumbUpOffAltIcon />
                )}
              </IconButton>
              <span>{likes}</span>
            </Box>
          </Box>

          <hr />
          <Grid container gap={2}>
            {Object.entries(item).map(
              ([key, value]) =>
                !notToShow.includes(key) && (
                  <Grid item width={'100%'} key={key}>
                    <Typography>
                      <b>{key}:</b>{' '}
                      {typeof value !== 'boolean' ? (
                        <>{value}</>
                      ) : value === true ? (
                        <CheckBoxIcon />
                      ) : (
                        <IndeterminateCheckBoxIcon />
                      )}
                    </Typography>
                  </Grid>
                )
            )}
            <Grid item width={'100%'}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <b>Tags:</b>
                {tags.map((tag: any) => (
                  <MyTag tag={tag} key={tag.id} />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Comments itemId={id} socket={socket} />
    </>
  )
}

export default ItemPage
