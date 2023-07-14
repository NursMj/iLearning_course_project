import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import AppRouter from './components/AppRouter'
import { check } from './http/userApi'
import { useDispatch } from 'react-redux'
import { setIsAuth, setUser } from './store/userReducer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MySpinner from './common/MySpinner'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <AppRouter />
      </Container>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default function WrappedApp() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const isDarkMode = useSelector((state: any) => state.darkMode.darkMode)
  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#007bff',
      },
    },
  })

  useEffect(() => {
    check()
      .then((data) => {
        dispatch(setUser(data))
        dispatch(setIsAuth(true))
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="mt-5 d-flex justify-content-center">
        <MySpinner />
      </div>
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
