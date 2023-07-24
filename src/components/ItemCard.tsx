import Typography from '@mui/material/Typography'
import MyLink from '../common/MyLink'
import { Box, Paper } from '@mui/material'
import ItemActionMenu from './ActionMenu/ItemActionMenu'
import trimTextIfLong from '../utils/trimTextIfLong'

function ItemCard(props: any) {
  const { item, type, setShowModal, actionsVisible } = props
  const path = `/${type}/${item.id}`
  const isItem = type === 'item'

  const ItemContent = () => {
    return (
      <>
        <Typography variant="h6" component="div">
          {trimTextIfLong(item.Name, 40)}
        </Typography>
        <Typography color="text.secondary">
          Collection: {item.Name}
        </Typography>
        <Typography color="text.secondary">
          likes: {item.likesCount || 0}
        </Typography>
      </>
    )
  }

  const CollectionContent = () => {
    return (
      <>
        <Typography variant="h6" component="div">
          {trimTextIfLong(item.name, 40)}
        </Typography>
        <Typography color="text.secondary">
          Items amount: {item?.Items?.length}
        </Typography>
      </>
    )
  }

  return (
    <Box
      sx={{
        m: { xs: '0 auto', sm: 0 },
        width: { xs: '90%', sm: '270px' },
        display: 'flex',
      }}
    >
      {' '}
      <Paper
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          p: { xs: 1, md: 2 },
        }}
      >
        <MyLink
          to={path}
          content={
            <>
              {isItem ? <ItemContent /> : <CollectionContent />}
              <Typography variant="body2">
                Author:{' '}
                {item.author || item?.User?.name || (
                  <em>User has been deleted</em>
                )}
              </Typography>
            </>
          }
        />
        {actionsVisible && (
          <Box>
            <ItemActionMenu
              item={item}
              setShowModal={setShowModal}
              type={type}
            />
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default ItemCard
