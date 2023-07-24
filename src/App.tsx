import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import AppRouter from './components/AppRouter'
import { useDispatch } from 'react-redux'
import { checkUser } from './store/userReducer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MySpinner from './common/MySpinner'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container sx={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <AppRouter />
      </Container>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default function WrappedApp() {
  const dispatch = useDispatch()
  const [isLoading, setIsloading] = useState(true)
  const darkMode = useSelector((state: any) => state.user.user.darkMode)
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#007bff',
      },
    },
  })
  const asyncChechUser = async () => {
    await dispatch(checkUser() as any)
    setIsloading(false)
  }

  useEffect(() => {
    asyncChechUser()
  }, [])

  if (isLoading)
    return (
      <div className="mt-5">
        <MySpinner />
      </div>
    )

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
