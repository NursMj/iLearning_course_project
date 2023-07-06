import Container from '@mui/material/Container'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userApi'
import AuthRegForm from '../components/Forms/AuthRegForm'
import { useDispatch } from 'react-redux'
import { setIsAuth, setUser } from '../store/userReducer'
import { HOME_ROUTE } from '../utils/consts'
import { toast } from 'react-toastify'

function AuthRegPage() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (password && email) {
      setIsLoading(true)
      setError('')
      try {
        let data
        if (isLogin) {
          data = await login(email, password)
          toast.success('Loged in successful!', {
            autoClose: 1500,
          })
        } else {
          data = await registration(name, email, password)
          toast.success('Signup successful!')
        }
        dispatch(setIsAuth(true))
        dispatch(setUser(data))
        navigate(HOME_ROUTE)
      } catch (e: any) {
        if (e.response) {
          setError(e.response.data.message)
        } else {
          setError(e.message)
        }
        console.log(e)
      }
      setIsLoading(false)
    } else {
      setError('Fill in required fields')
    }
  }
  //   e.preventDefault()
  //   // if (password && name) {
  //   // setError('')
  //   // setIsLoading(true)
  //   try {
  //     const data = await registration(name, email, password)
  //   } catch (error) {
  //     // setError('Sorry but something went wrong on the server side, please try again later')
  //     console.log(error)
  //   }
  //   // setIsLoading(false)
  //   // } else {
  //   //   // setError('Please enter a valid email and fill all fields')
  //   // }
  // }

  // const handleSubmit = isLogin ? handleLogin : handleRegistration

  return (
    <Container component="main" maxWidth="xs">
      <AuthRegForm
        props={{
          isLoading,
          isLogin,
          handleSubmit,
          setName,
          name,
          setPassword,
          password,
          setEmail,
          email,
          error,
          setError,
        }}
      />
    </Container>
  )
}

export default AuthRegPage
