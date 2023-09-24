import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './redux/store'
import { HelmetProvider } from 'react-helmet-async'
import { Board, Main } from './pages'
import { Modal } from './components'

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/board:projectId', element: <Board /> }
])

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Modal />
      </Provider>
    </HelmetProvider>
  )
}

export default App
