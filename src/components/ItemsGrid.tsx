import { Box, Typography } from '@mui/material'
import ItemCard from './ItemCard'

function ItemsGrid(props: any) {
  const { data, type, error, setShowModal, actionsVisible = false } = props

  if (error)
    return <Typography variant="h6">{error}. Faild to fetch data.</Typography>

  if (data.length === 0)
    return <Typography variant="h6">Looks like it is empty here</Typography>

  return (
    <Box
      sx={{
        paddingBottom: '40px',
        display: 'flex',
        gap: { xs: 1, md: 3 },
        flexWrap: 'wrap',
      }}
    >
      {data.map((item: any) => (
        <ItemCard
          key={item.id}
          item={item}
          setShowModal={setShowModal}
          actionsVisible={actionsVisible}
          type={type}
        />
      ))}
    </Box>
  )
}

export default ItemsGrid
