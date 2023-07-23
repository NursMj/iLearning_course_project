import { useTranslation } from 'react-i18next'
import ItemsGrid from '../components/ItemsGrid'
import MySpinner from '../common/MySpinner'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLatestItems } from '../store/itemsReducer'
import { getLargestCollections } from '../store/collectionsReducer'
import { getTags } from '../store/tagReducer'
import { Box, Typography } from '@mui/material'
import MyTag from '../common/MyTag'

function HomePage() {
  const { t } = useTranslation()
  const latestItems = useSelector((state: any) => state.items.latestItems.data)
  const latestIsLoading = useSelector(
    (state: any) => state.items.latestItems.isLoading
  )
  const latestError = useSelector((state: any) => state.items.latestItems.error)
  const largestCollections = useSelector(
    (state: any) => state.collections.largestCollections.data
  )
  const loading = useSelector((state: any) => state.collections.loading)
  const collectionsError = useSelector((state: any) => state.collections.largestCollections.error)
  const dispatch = useDispatch()
  const tags = useSelector((state: any) => state.tags.tags.data)
  const isTagsLodaing = useSelector((state: any) => state.tags.tags.isLodaing)
  const tagsError = useSelector((state: any) => state.tags.tags.error)

  useEffect(() => {
    dispatch(getLatestItems() as any)
    dispatch(getLargestCollections() as any)
    dispatch(getTags() as any)
  }, [dispatch])

  if (!tags) return null

  return (
    <>
      <div className="mb-5">
        <h3 className="mb-3">{t('home.last_added_items')}</h3>
        {latestIsLoading ? (
          <MySpinner />
        ) : (
          <ItemsGrid data={latestItems} error={latestError} type="item" />
        )}
      </div>
      <div className="mb-5">
        <h3 className="mb-3">{t('home.5_biggest_collections')}</h3>
        {loading ? (
          <MySpinner />
        ) : (
          <ItemsGrid
            data={largestCollections}
            error={collectionsError}
            type="collection"
          />
        )}
      </div>
      <div className="mb-5">
        <h3 className="mb-3">{t('home.tag_cloud')}</h3>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tagsError && <Typography variant="h6">{tagsError}. Faild to fetch data.</Typography>}
          {isTagsLodaing ? (
            <MySpinner />
          ) : (
            tags.map((tag: any) => <MyTag tag={tag} key={tag.id} />)
          )}
        </Box>
      </div>
    </>
  )
}

export default HomePage
