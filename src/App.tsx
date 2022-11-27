import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Board, Main } from './pages'

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/board', element: <Board /> }
])

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
