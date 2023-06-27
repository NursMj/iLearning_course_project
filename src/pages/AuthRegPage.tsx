import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

function AuthRegPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function storeEmail() {
    localStorage.setItem('email', email);
  }

  async function handleLogin(e: any){
    e.preventDefault()
    if (password.length > 0 && email != '') {
      // setIsLoading(true)
      setError('')
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + 'users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password}),
      })
      if (response.ok) {
          // setIsAuth(true)
          storeEmail()
          navigate('/admin')
        } else {
          const responseData = await response.json();
          setError(responseData.error);
        }
      } catch (error) {
        setError('Sorry but something went wrong on the server side, please try again later')
        console.log(error)
      }
      // setIsLoading(false)
    } else {
      setError('Invalid email or password')
    }
  }

  async function handleRegistration(e: any) {
    e.preventDefault()
    if (password && userName) {
      setError('')
      // setIsLoading(true)
      try {
        const response = await fetch(import.meta.env.VITE_API_URL+"users/registration", {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({name: userName,email: email,password: password,}),
        })
        if(response.ok) {
          const responseData = await response.json();
          alert(responseData.message);
          navigate('/')
        } else {
          const responseData = await response.json();
          setError(responseData.error);
        }
      } catch (error) {
        setError('Sorry but something went wrong on the server side, please try again later')
        console.log(error);
      }
      // setIsLoading(false)
    } else {
      setError('Please enter a valid email and fill all fields')
    }
  }

  const handleSubmit = isLogin ? handleLogin : handleRegistration

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className='mt-5' style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title>{isLogin ? (t('login_form.title_login')) : (t('login_form.title_registration'))}</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* {isLoading && <Alert variant="primary">Loading...</Alert>} */}
          <Form onSubmit={handleSubmit}>
            {!isLogin && 
              <Form.Group controlId="formUserName">
                <Form.Label>{t('login_form.name')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('login_form.name_placeholder')}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>}
            <Form.Group controlId="formEmail">
              <Form.Label>{t('login_form.email')}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('login_form.email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>{t('login_form.password')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('login_form.password_placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>


            <div className='d-flex justify-content-between align-items-center mt-3'>
              <Button variant="primary" type="submit">
                {isLogin ? (t('login_form.btn_login')) : (t('login_form.btn_register'))}
              </Button>
              {isLogin ? 
                <div>
                  {t('login_form.dont_have_ac')}  <NavLink onClick={()=> setError('')} to='/registration'>{t('login_form.singup_link')}</NavLink>
                </div>
                :
                <div>
                  {t('login_form.have_ac')}  <NavLink onClick={()=> setError('')} to='/login'>{t('login_form.login_link')}</NavLink>
                </div>
              }
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AuthRegPage
