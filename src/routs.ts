import HomePage from './pages/HomePage'
import AuthRegPage from './pages/AuthRegPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import CollectionPage from './pages/CollectionPage'
import ItemPage from './pages/ItemPage'
import SearchResultPage from './pages/SearchResultPage'
import {
  ADMIN_ROUTE,
  COLLECTION_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
  ITEM_ROUTE,
  SEARCH_ROUTE,
} from './utils/consts'

export const authAdminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },
  {
    path: USER_ROUTE,
    Component: UserPage,
  },
]

export const authRoutes = [
  {
    path: USER_ROUTE,
    Component: UserPage,
  },
]

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthRegPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthRegPage,
  },
  {
    path: SEARCH_ROUTE,
    Component: SearchResultPage,
  },
  {
    path: COLLECTION_ROUTE + '/:id',
    Component: CollectionPage,
  },
  {
    path: ITEM_ROUTE + '/:id',
    Component: ItemPage,
  },
]
