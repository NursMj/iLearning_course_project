import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import MyLink from '../common/MyLink'

function ItemCard(props: any) {
  const { item, type } = props
  const path = `/${type}/${item.id}`
  const isItem = type === 'item'

  return (
    <MyLink
      to={path}
      content={
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {item.title}
            </Typography>
            {isItem && (
            <><Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item?.collaction}
            </Typography>
            <Typography variant="body2">{item?.author}</Typography>
            </>)}
          </CardContent>
        </Card>
      }
    />
  )
}

export default ItemCard
