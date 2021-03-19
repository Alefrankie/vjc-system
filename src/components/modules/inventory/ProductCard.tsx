import IconProduct from 'public/img/inventory/icon-product.svg'

export function ProductCard (props: {
  productCode?: string
  quantity?: number
  productName?: string
  unit?: string
  unitaryPrice?: number
  exchangeRate?: number
  deleteProduct?: any
  getProduct?: any
  productId?: string
}) {
  const {
    quantity,
    productName,
    unit,
    // unitaryPrice,
    // exchangeRate,
    deleteProduct,
    getProduct,
    productId
  } = props
  return (
    <div className='product-card'>
      <div className='header-product-card'>
        <div className='header-product-card-left'>{props.productCode}</div>

        <div className='header-product-card-right'>
          <button onClick={() => getProduct(productId)}>Modificar</button>
          <button onClick={() => deleteProduct(productId)}>Eliminar</button>
        </div>
      </div>

      <div className='body-product-card'>
        <div className='product-photo-field'>
          <div>
            <img src={IconProduct} alt='icon-product' />
          </div>
        </div>

        <div className='container-data'>
          <h1>{productName}</h1>
          <small>
            STOCK: {quantity} {unit}
          </small>
          {
            //   <b>
            //   Precio:{unitaryPrice} $ /{' '}
            //   {formatter.format(unitaryPrice * exchangeRate)} Bs.S
            // </b>
          }
        </div>
      </div>
    </div>
  )
}
