import Container from '@mui/material/Container'
import { useTranslation } from 'react-i18next'
import ItemsList from '../components/ItemsList'

function HomePage() {
  const { t } = useTranslation()
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
  ]
  const collectionData = [
    { id: 1, title: 'collection1' },
    { id: 2, title: 'collection2' },
    { id: 3, title: 'collection3' },
    { id: 4, title: 'collection4' },
    { id: 5, title: 'collection5' },
  ]
  // const tags = ['banana', 'apple', 'orange', 'pear']

  return (
    <Container>
      <div className="mt-5">
        <h3 className="mb-3">{t('home.last_added_items')}</h3>
        <ItemsList data={data} type="item" />
      </div>
      <div className="mt-5">
        <h3 className="mb-3">{t('home.5_biggest_collections')}</h3>
        <ItemsList data={collectionData} type="collection" />
      </div>
      <div className="mt-5">
        <h3 className="mb-3">{t('home.teg_cloud')}</h3>
        tegs
      </div>
    </Container>
  )
}

export default HomePage
