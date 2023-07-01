import { useParams } from 'react-router-dom'
import ItemsList from '../components/ItemsList'
import Toolbar from '../components/ToolBar'

function CollectionPage() {
  const id = useParams().id
  const data = [
    { id: 1, title: 'item1', collaction: 'collaction1', author: 'author1' },
    { id: 2, title: 'item2', collaction: 'collaction2', author: 'author2' },
    { id: 3, title: 'item3', collaction: 'collaction3', author: 'author3' },
    { id: 4, title: 'item4', collaction: 'collaction4', author: 'author4' },
    { id: 5, title: 'item5', collaction: 'collaction5', author: 'author5' },
    { id: 6, title: 'item1', collaction: 'collaction1', author: 'author1' },
    { id: 7, title: 'item2', collaction: 'collaction2', author: 'author2' },
    { id: 8, title: 'item3', collaction: 'collaction3', author: 'author3' },
    { id: 9, title: 'item4', collaction: 'collaction4', author: 'author4' },
    { id: 10, title: 'item5', collaction: 'collaction5', author: 'author5' },
    { id: 11, title: 'item4', collaction: 'collaction4', author: 'author4' },
    { id: 12, title: 'item5', collaction: 'collaction5', author: 'author5' },
  ]

  return (
    <>
      #{id} CollectionPage 
      <Toolbar />
      <ItemsList data={data} type="item" />
    </>
  )
}

export default CollectionPage
