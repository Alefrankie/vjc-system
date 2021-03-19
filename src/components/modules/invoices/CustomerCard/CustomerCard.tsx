import { CustomerData } from './CustomerData'
import { FindCustomer } from './FindCustomer'
import { useResponse } from 'hooks/useResponse'
import { ModalAlert } from 'components/Elements/ModalAlert'

type Props = {
    customerId: string
    customerType: string
}

export function CustomerCard({
    customerId = '',
    customerType
}: Props): React.ReactElement {
    const { response, setResponse } = useResponse()
    return (
        <div
            className='customer-card'
            style={{
                width: customerType === 'provider' ? '100%' : '30%',
                height: customerType === 'provider' ? '20rem' : '25rem'
            }}
        >
            {response && (
                <ModalAlert
                    message={response.text}
                    tittle='Facturas'
                    status={response.status}
                    setResponse={setResponse}
                />
            )}
            <FindCustomer customerType={customerType} />
            <CustomerData
                customerType={customerType}
                customerId={customerId}
                setResponse={setResponse}
            />
        </div>
    )
}

// const MemoizedCustomerCard = memo(CustomerCard)
// export { MemoizedCustomerCard as CustomerCard }
