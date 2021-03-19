import { faCoffee, faHome } from '@fortawesome/free-solid-svg-icons'
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: faHome,
    layout: '/admin'
  },
  {
    path: '/inventory',
    name: 'Inventario',
    icon: faCoffee,
    layout: '/admin'
  },
  {
    path: '/preferences',
    name: 'Preferencias',
    icon: faCoffee,
    layout: '/admin'
  },
  {
    path: '/reports',
    name: 'Reportes',
    icon: faCoffee,
    layout: '/admin'
  },
  {
    path: '/users',
    name: 'Usuarios',
    icon: faCoffee,
    layout: '/admin'
  }
]
export default routes
