// import CardActions from '@mui/material/CardActions'
// import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

function ItemCard(props: any) {
  const { item } = props

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item?.collaction}
        </Typography>
        <Typography variant="body2">{item?.author}</Typography>
      </CardContent>
      {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
    </Card>
  )
}

export default ItemCard
