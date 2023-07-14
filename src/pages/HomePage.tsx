import { useTranslation } from 'react-i18next'
import ItemsList from '../components/ItemsGrid'
import { Button } from 'react-bootstrap'
import MySpinner from '../common/MySpinner'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLatestItems } from '../store/itemsReducer'
import { getLargestCollections } from '../store/collectionsReducer'

function HomePage() {
  const { t } = useTranslation()
  const latestItems = useSelector((state: any) => state.items.latestItems)
  const latestIsLoading = useSelector(
    (state: any) => state.items.latestIsLoading
  )
  // const dispatch = useDispatch()
  const largestCollections = useSelector((state: any) => state.collections.largestCollections.data)
  const loading = useSelector((state: any) => state.collections.loading)
  // const error = useSelector((state: any) => state.collections.error)
  const tegs = ['banana', 'apple', 'orange', 'pear']
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLatestItems() as any)
    dispatch(getLargestCollections() as any)
  }, [])

  return (
    <>
      <div className="mb-5">
        <h3 className="mb-3">{t('home.last_added_items')}</h3>
        {latestIsLoading ? (
          <MySpinner />
        ) : (
          <ItemsList data={latestItems} type="item" />
        )}
      </div>
      <div className="mb-5">
        <h3 className="mb-3">{t('home.5_biggest_collections')}</h3>
        {loading ? (
          <MySpinner />
        ) : (
          <ItemsList data={largestCollections} type="collection" />
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
