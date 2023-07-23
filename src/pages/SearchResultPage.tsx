import { useDispatch, useSelector } from 'react-redux'
import MySpinner from '../common/MySpinner'
import { Box, Typography } from '@mui/material'
import ItemsGrid from '../components/ItemsGrid'
import { useEffect } from 'react'
import { getSearchResults } from '../store/searchResultsReducer'
import { useSearchParams } from 'react-router-dom'

function SearchResultPage() {
  const collections = useSelector(
    (state: any) => state.searchResults.searchResults.collections
  )
  const items = useSelector(
    (state: any) => state.searchResults.searchResults.items
  )
  const resultsLoading = useSelector(
    (state: any) => state.searchResults.searchResults.isLoading
  )
  const resultsError = useSelector(
    (state: any) => state.searchResults.searchResults.error
  )
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const searchText = searchParams.get('searchText')

  useEffect(() => {
    dispatch(getSearchResults(searchText as string) as any)
  }, [searchText])

  if (resultsLoading) return <MySpinner />

  return (
    <Box sx={{display: 'grid', gap: 5}}>
      <Typography variant="h4">Search results for '{searchText}'</Typography>
      <Box>
        <Typography variant="h5">Results from collections</Typography>
        <ItemsGrid
          data={collections}
          type={'collection'}
          error={resultsError}
        />
      </Box>
      <Box>
        <Typography variant="h5">Results from items</Typography>
        <ItemsGrid data={items} type={'item'} error={resultsError} />
      </Box>
    </Box>
  )
}

export default SearchResultPage
