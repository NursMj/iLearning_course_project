import { useTranslation } from 'react-i18next'
import ItemsList from '../components/ItemsList'
import { Button } from 'react-bootstrap'
import MySpinner from '../common/MySpinner'
import { useSelector } from 'react-redux'

function HomePage() {
  const { t } = useTranslation()
  const items = [
    { id: 1, name: 'item1', collaction: 'collaction1', author: 'author1' },
    { id: 2, name: 'item2', collaction: 'collaction2', author: 'author2' },
    { id: 3, name: 'item3', collaction: 'collaction3', author: 'author3' },
    { id: 4, name: 'item4', collaction: 'collaction4', author: 'author4' },
    { id: 5, name: 'item5', collaction: 'collaction5', author: 'author5' },
    { id: 6, name: 'item1', collaction: 'collaction1', author: 'author1' },
    { id: 7, name: 'item2', collaction: 'collaction2', author: 'author2' },
    { id: 8, name: 'item3', collaction: 'collaction3', author: 'author3' },
  ]
  // const dispatch = useDispatch()
  const collections = useSelector((state: any) => state.collections.collections)
  const loading = useSelector((state: any) => state.collections.loading)
  // const error = useSelector((state: any) => state.collections.error)
  const tegs = ['banana', 'apple', 'orange', 'pear']

  return (
    <>
      <div className="mb-5">
        <h3 className="mb-3">{t('home.last_added_items')}</h3>
        <ItemsList data={items} type="item" />
      </div>
      <div className="mb-5">
        <h3 className="mb-3">{t('home.5_biggest_collections')}</h3>
        {loading ? (
          <MySpinner />
        ) : (
          <ItemsList data={collections} type="collection" />
        )}
      </div>
      <div className="mb-5">
        <h3 className="mb-3">{t('home.teg_cloud')}</h3>
        {tegs.map((teg: string, i: number) => (
          <Button key={i}>{teg}</Button>
        ))}
      </div>
    </>
  )
}

export default HomePage
