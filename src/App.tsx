import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthRegPage from './pages/AuthRegPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import CollectionPage from './pages/CollectionPage'
import ItemPage from './pages/ItemPage'
import SearchResultPage from './pages/SearchResultPage'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container style={{paddingTop: '60px', paddingBottom: '60px'}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<AuthRegPage />} />
          <Route path="/login" element={<AuthRegPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/collection/:id" element={<CollectionPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/search-result" element={<SearchResultPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default function WrappedApp() {
  const isDarkMode = useSelector((state: any) => state.darkMode.darkMode)
  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#007bff',
      },
    },
  })

  return (
    <Suspense fallback="...loading">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Suspense>
  )
}
