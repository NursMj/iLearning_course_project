import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import AppRouter from './components/AppRouter'

console.log(import.meta.env.VITE_API_URL)

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <AppRouter />
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
