import { Paper } from '@mui/material'
import MyLink from './MyLink'

function MyTag({ tag }: any) {
  return (
    <MyLink
      to={`/tag/${tag.id}`}
      content={
        <Paper elevation={4} sx={{ p: '5px 10px' }} key={tag.name}>
          {tag.name}
        </Paper>
      }
    />
  )
}

export default MyTag
