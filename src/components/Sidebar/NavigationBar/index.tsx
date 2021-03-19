import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faCog,
  faCubes,
  faPencilAlt,
  faPencilRuler,
  faPenFancy,
  faShoppingBasket,
  faShoppingCart,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MenuItems } from './MenuItems'

type RoutesType = {
  link?: string
  title: string
  icon: IconProp
  items: any[]
}

const routes: RoutesType[] = [
  {
    title: 'Clientes',
    icon: faCubes,
    items: [
      {
        link: '/admin/clients/clientForm',
        title: 'Registrar Cliente',
        icon: faShoppingCart
      },
      {
        link: '/admin/clients/clientList',
        title: 'Lista de Clientes',
        icon: faShoppingCart
      }
    ]
  },

  {
    title: 'Notas de Entrega',
    icon: faShoppingCart,
    items: [
      {
        link: '/admin/invoices/createInvoice/?invoiceType=DeliveryNote:Retail',
        title: 'Al Detal',
        icon: faShoppingCart
      },
      {
        link:
          '/admin/invoices/createInvoice/?invoiceType=DeliveryNote:Wholesale',
        title: 'Al Mayor',
        icon: faShoppingCart
      }
    ]
  },
  {
    title: 'Facturas Fiscales',
    icon: faShoppingCart,
    items: [
      {
        link: '/admin/invoices/createInvoice/?invoiceType=Sales:Retail',
        title: 'Al Detal',
        icon: faShoppingCart
      },
      {
        link: '/admin/invoices/createInvoice/?invoiceType=Sales:Wholesale',
        title: 'Al Mayor',
        icon: faShoppingCart
      }
    ]
  },
  {
    title: 'Presupuesto',
    icon: faShoppingCart,
    items: [
      {
        link: '/admin/invoices/createInvoice/?invoiceType=Budget:Retail',
        title: 'Al Detal',
        icon: faShoppingCart
      },
      {
        link: '/admin/invoices/createInvoice/?invoiceType=Budget:Wholesale',
        title: 'Al Mayor',
        icon: faShoppingCart
      }
    ]
  },
  {
    title: 'Reportes',
    icon: faPencilRuler,
    items: [
      {
        link: '/admin/reports/invoicesList/Sales',
        title: 'Facturas Fiscales',
        icon: faShoppingCart
      },
      {
        link: '/admin/reports/invoicesList/Budget',
        title: 'Presupuestos',
        icon: faShoppingCart
      },
      {
        link: '/admin/reports/invoicesList/DeliveryNote',
        title: 'Notas de Entrega',
        icon: faShoppingCart
      },
      {
        link: '/admin/reports/inventory/aLotOfProducts',
        title: 'Productos',
        icon: faShoppingCart
      }
    ]
  },
  {
    title: 'Usuarios',
    icon: faUsers,
    items: [
      {
        link: '/admin/users/usersList',
        title: 'Lista de Usuarios',
        icon: faUsers
      }
    ]
  },
  {
    title: 'Inventario',
    icon: faShoppingBasket,
    items: [
      {
        link: '/admin/inventory/productList',
        title: 'Lista de Productos',
        icon: faPencilAlt
      },
      {
        link: '/admin/inventory/addProduct',
        title: 'Añadir Productos',
        icon: faPenFancy
      }
    ]
  },
  {
    title: 'Preferencias',
    icon: faCog,
    items: [
      {
        link: '/admin/preferences',
        title: 'Modificar',
        icon: faPencilAlt
      }
    ]
  }
]

export function NavigationBar(): React.ReactElement {
  return (
    <nav className='flex flex-col'>
      {routes.map(({ title, icon, items }, index) => (
        <div
          className='flex justify-between items-center | pl-2 | hover:bg-yellow-500 | cursor-pointer | relative'
          key={index}
        >
          <button className='text-white | py-2 | focus:outline-none'>
            <FontAwesomeIcon
              name={title}
              icon={icon}
              className='text-white text-lg | cursor-pointer'
            />
            &nbsp;
            {title}
            {items.length >= 1 && <MenuItems items={items} />}
          </button>
        </div>
      ))}
    </nav>
  )
}
