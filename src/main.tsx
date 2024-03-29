import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './i18n.ts'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
