import { Typography } from '@mui/material'
import ItemCard from './ItemCard'

function ItemsGrid(props: any) {
  const { data, type } = props

  if (data.length === 0) return <Typography variant='h6'>Looks like it is empty here</Typography>

  return (
    <div className="d-flex gap-3 flex-wrap">
      {data.map((item: any) => (
        <ItemCard key={item.id} item={item} type={type} />
      ))}
    </div>
  )
}

export default ItemsGrid
