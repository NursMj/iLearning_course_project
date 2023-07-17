import { Routes, Route, Navigate } from 'react-router-dom'
import { authAdminRoutes, authRoutes, publicRoutes } from '../routs'
import { HOME_ROUTE } from '../utils/consts'
import { useSelector } from 'react-redux'

const AppRouter = () => {
  const user = useSelector((state: any) => state.user.user)
  const isAdmin = user.data.role === 'ADMIN'

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} />
        })}
      {user.isAuth &&
        isAdmin &&
        authAdminRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} />
        })}
      {publicRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={<Component />} />
      })}
      <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
    </Routes>
  )
}

export default AppRouter
