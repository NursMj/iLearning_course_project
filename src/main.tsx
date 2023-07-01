import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './i18n.ts'
import { store, persistor } from './store/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fontsource/public-sans'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={'Загрузка'} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
