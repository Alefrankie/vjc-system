import { faChartBar, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { CardElement } from './CardElement'

type Stats = {
  products: Number
  allInvoices: Number
  retailInvoices: Number
  wholesaleInvoices: Number
}

export function HeaderAdmin (): React.ReactElement {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    allInvoices: 0,
    retailInvoices: 0,
    wholesaleInvoices: 0
  })

  useEffect(() => {
    async function fetchStats () {
      try {
        const res = await fetch('/services/getStats')
        if (!res.ok) throw new Error(await res.text())
        const stats = await res.json()
        setStats(stats)
      } catch ({ message }) {
        console.error(message)
      }
    }
    fetchStats()
  }, [])

  return (
    <>
      <div className='container mx-auto flex mt-5 px-5'>
        <CardElement
          title='Notas de Entrega'
          footerTitle='General'
          icon={faChartBar}
          stats={stats.allInvoices}
        />
        <CardElement
          title='Notas de Entrega'
          footerTitle='Mayor'
          icon={faChartPie}
          stats={stats.wholesaleInvoices}
        />
        <CardElement
          title='Notas de Entrega'
          footerTitle='Detal'
          icon={faChartPie}
          stats={stats.retailInvoices}
        />
        <CardElement
          title='Inventario'
          footerTitle='Productos'
          icon={faChartPie}
          stats={stats.products}
        />
      </div>
    </>
  )
}
