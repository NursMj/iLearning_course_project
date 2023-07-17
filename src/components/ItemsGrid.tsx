import { Box, Typography } from '@mui/material'
import ItemCard from './ItemCard'

function ItemsGrid(props: any) {
  const { data, type } = props

  if (data.length === 0)
    return <Typography variant="h6">Looks like it is empty here</Typography>

  return (
    <Box
      sx={{
        paddingTop: '40px',
        paddingBottom: '40px',
        display: 'flex',
        gap: 3,
        flexWrap: 'wrap',
      }}
    >
      {data.map((item: any) => (
        <ItemCard key={item.id} item={item} type={type} />
      ))}
    </Box>
  )
}

export default ItemsGrid
