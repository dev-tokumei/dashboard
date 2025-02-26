import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Finalize } from '../pages/Finalize'
import { Result } from '../pages/Results'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/finalize/:id',
    element: <Finalize />,
  },
  {
    path: '/result/:id',
    element: <Result />,
  },
])
