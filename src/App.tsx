import { Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthRegPage from './pages/AuthRegPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/registration" element={<AuthRegPage/>} />
        <Route path="/login" element={<AuthRegPage/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
  </BrowserRouter>



  )
}

export default function WrappedApp() {
  const [darkMode, setDarkMode] = useState(true)
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark': 'light',
    },
  })

  return (
    <Suspense fallback='...loading'>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Suspense>
  )
}
