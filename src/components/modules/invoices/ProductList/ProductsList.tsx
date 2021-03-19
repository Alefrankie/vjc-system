import { ModalAlert } from 'components/Elements/ModalAlert'
import { OnKeySearchLocal } from 'components/Elements/OnKeySearchLocal'
import { useInvoice } from 'context'
import { useResponse } from 'hooks/useResponse'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ProductT } from 'types'
import { ProductsListTableInvoice } from './ProductsListTableInvoice'
import { QuantityRequestedForm } from './QuantityRequestedForm'

type Props = {
  invoiceType: string
  preferences: any
  products: ProductT[]
}

export function ProductsList({
  invoiceType,
  preferences,
  products
}: Props): React.ReactElement {
  const { cart, oneCustomer, setState } = useInvoice()
  const [currentProducts, setCurrentProducts] = useState(products)

  useEffect(() => {
    setState({ products: currentProducts })
  }, [])

  const { response, setResponse } = useResponse()
  const { errors, register, handleSubmit, reset, getValues } = useForm()

  const makeRequestQuantity = (currentProduct: ProductT): void => {
    console.log(currentProduct)
    const { productCode, quantity, unitaryPrice, retailPrice } = currentProduct
    const productFound = cart.find(
      (e: { productCode: string }) => e.productCode === productCode
    )

    reset({})

    if (!oneCustomer) {
      return setResponse({
        text: 'Debe seleccionar un cliente.',
        status: 'failed'
      })
    }

    if (quantity < 0) {
      return setResponse({
        text: 'El producto está agotado.',
        status: 'failed'
      })
    }

    if (productFound) {
      return setResponse({
        text: 'No puede introducir el mismo articulo 2 veces.',
        status: 'failed'
      })
    }

    if (Number(cart.length) >= 16) {
      return setResponse({
        text:
          'Se alcanzó el límite del carrito.\nSugerencia: Usted Debe generar una nueva factura',
        status: 'failed'
      })
    }

    currentProduct.productPrice = invoiceType.includes('Retail')
      ? retailPrice
      : unitaryPrice
    currentProduct.productDiscount = 0
    currentProduct.quantityRequested = 0
    setState({
      oneProduct: currentProduct,
      available: true
    })
  }

  return (
    <>
      <div className='my-3 px-3'>
        <OnKeySearchLocal
          setState={setCurrentProducts}
          array={currentProducts}
          where='products'
        />
      </div>
      {/* <OnKeySearch setState={setState} array={products} where='products' /> */}
      <div className='flex justify-between'>
        <ProductsListTableInvoice
          invoiceType={invoiceType}
          makeRequestQuantity={makeRequestQuantity}
          preferences={preferences}
          products={currentProducts}
        />

        <QuantityRequestedForm
          invoiceType={invoiceType}
          handleSubmit={handleSubmit}
          getValues={getValues}
          register={register}
          errors={errors}
          reset={reset}
          preferences={preferences}
        />
      </div>
      <hr className='my-3' />
      {/* <div className='product-list-invoice'> */}

      {response && (
        <ModalAlert
          tittle='Ventas'
          message={response.text}
          status={response.status}
          setResponse={setResponse}
        />
      )}
    </>
  )
}

// const MemoizedProductsList = memo(ProductsList)
// export { MemoizedProductsList as ProductsList }
