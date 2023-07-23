import { styled, alpha } from '@mui/material/styles'
import { InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import { SEARCH_ROUTE } from '../utils/consts'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function SearchInput() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')

  const handleSearchSubmit = (event: any) => {
    event.preventDefault()
    if (event.key !== 'Enter' || searchText === '') return
    navigate(SEARCH_ROUTE + '?searchText=' + searchText)
    setSearchText('')
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchText}
        onChange={(event: any) => setSearchText(event.target.value)}
        placeholder={t('header.search_placeholder')}
        inputProps={{ 'aria-label': 'search' }}
        onKeyUp={handleSearchSubmit}
      />
    </Search>
  )
}
