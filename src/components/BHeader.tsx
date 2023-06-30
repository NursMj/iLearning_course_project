import { Container, Navbar, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()

  function logOut(): any {

  }

  return (
    <Navbar bg="dark" variant="dark">
        <Container className='pt-2 pb-2'>
          <Link to='/' className='text-decoration-none'>
            <Navbar.Brand>
              {t('header.title')} <br /> {t('header.app_name')}
            </Navbar.Brand>
          </Link>
          <div className='d-flex gap-3 align-items-center'>
            
            <Button onClick={logOut}>{t('header.login')}</Button>
          </div>
        </Container>
      </Navbar>
  )
}

export default Header