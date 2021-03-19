import { PreferencesCard } from 'components/modules/Preferences/PreferencesCard'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { useUser } from 'context'
import Admin from 'layouts/Admin'
import { GetServerSideProps } from 'next'
import { fetchPreferences } from 'services/preferences'
import { PreferencesT } from 'types'
import { useState } from 'react'

type Props = {
  preferences: PreferencesT
}

function PageComponent ({
  preferences: currentPreferences
}: Props): React.ReactElement {
  const { user } = useUser()
  const [preferences, setPreferences] = useState(currentPreferences)
  const { exchangeRate, retailRate, ivaRate } = preferences
  const preferenceCards = [
    {
      title: 'Tasa del Dólar Preferencial',
      nameRate: 'exchangeRate',
      rate: exchangeRate || 0
    },
    {
      title: 'Tasa del Dólar Productos Al Detal',
      nameRate: 'retailRate',
      rate: retailRate || 0
    },
    {
      title: 'IVA',
      nameRate: 'ivaRate',
      rate: ivaRate || 0
    }
  ]

  if (user?.privileges === 'User') {
    return (
      <div>
        <ModalAlert
          tittle='Preferencias'
          redirect='/admin/dashboard'
          message={
            'Usted no posee los privilegios necesarios para ingresar a éste módulo.'
          }
          status='failed'
        />
      </div>
    )
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
      {preferenceCards.map(({ title, nameRate, rate }, index) => {
        return (
          <PreferencesCard
            title={title}
            rate={rate}
            nameRate={nameRate}
            preferences={preferences}
            setPreferences={setPreferences}
            key={index}
          />
        )
      })}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { preferences } = await fetchPreferences()
  return { props: { preferences } }
}

PageComponent.layout = Admin

export default PageComponent
