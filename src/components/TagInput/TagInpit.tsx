import { Box, Typography } from '@mui/material'
import { WithContext as ReactTags } from 'react-tag-input'
import './TagInput.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTags } from '../../store/tagReducer'
import MySpinner from '../../common/MySpinner'

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default function TagInput({ tags, setTags }: any) {
  const allTags = useSelector((state: any) => state.tags.tags.data)
  const isLodaing = useSelector((state: any) => state.tags.tags.isLodaing)
  // const error = useSelector((state: any) => state.tags.tags.error)
  const dispatch = useDispatch()
  const suggestions = allTags.map((tag: any) => {
    return { id: tag.name, text: tag.name }
  })

  const handleDelete = (i: any) => {
    setTags(tags.filter((_tag: any, index: any) => index !== i))
  }

  const handleAddition = (tag: any) => {
    setTags([...tags, tag])
  }

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    const newTags = tags.slice()
    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)
    setTags(newTags)
  }

  useEffect(() => {
    dispatch(getTags() as any)
  }, [])

  if (isLodaing) return <MySpinner />

  return (
    <Box>
      <Typography>Tags:</Typography>
      <Box>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          autocomplete
        />
      </Box>
    </Box>
  )
}
