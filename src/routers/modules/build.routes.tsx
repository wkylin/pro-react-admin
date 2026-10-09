import { lazyComponents } from '../config/lazyLoad.config'

export const buildRoutes = [
  {
    path: 'build/vite',
    name: 'Vite',
    element: <lazyComponents.ViteBuild />,
  },
]
