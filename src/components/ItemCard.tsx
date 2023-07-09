import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import MyLink from '../common/MyLink'

function ItemCard(props: any) {
  const { item, type } = props
  const path = `/${type}/${item.id}`
  const isItem = type === 'item'

  function handleCheck(e: any) {
    e.stopPropagation()
  }

  return (
    <MyLink
      to={path}
      content={
        <Card sx={{ minWidth: 275, position: 'relative' }}>
          <CardContent>
            <Checkbox
              color="primary"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
              onClick={handleCheck}
            />
            <Typography variant="h5" component="div">
              {item.name}
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
