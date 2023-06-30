import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthRegPage from './pages/AuthRegPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{paddingBottom: '50px'}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<AuthRegPage />} />
          <Route path="/login" element={<AuthRegPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
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
