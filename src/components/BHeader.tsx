import { useTranslation } from 'react-i18next'
import { Container, Navbar, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'


const locales: MyObject = {
  en: {title: 'En'},
  ru: {title: 'Ru'},
}

interface MyObject {
  [key: string]: { title: string };
}

function Header() {
  const { t, i18n } = useTranslation()

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
            <ul className='m-0'>
              {Object.keys(locales).map(l => (
                <li key={l}>
                  <button
                    style={{ fontWeight: i18n.resolvedLanguage === l ? 'bold' : 'normal' }}
                    onClick={()=> i18n.changeLanguage(l)}
                  >
                    {locales[l].title}
                  </button>
                </li>
              ))}
            </ul>
            <Button onClick={logOut}>{t('header.login')}</Button>
          </div>
        </Container>
      </Navbar>
  )
}

export default Header