import { LimitCardQuantities } from 'components/modules/Preferences/LimitCardQuantities'
import { ModalAlert } from 'components/Elements/ModalAlert'
import { useUser } from 'context'
import { GetServerSideProps } from 'next'
import { fetchPreferences } from 'services/preferences'
import { PreferencesT } from 'types'

type Props = {
  preferences: PreferencesT
}

function PreferencesInventoryPage ({ preferences }: Props): React.ReactElement {
  const { user } = useUser()

  return (
    <>
      {user?.privileges === 'User' && (
        <ModalAlert
          tittle='Preferencias'
          redirect='/admin/dashboard'
          message={
            'Usted no posee los privilegios necesarios para ingresar a éste módulo.'
          }
          status='failed'
        />
      )}
      <LimitCardQuantities typeUnit='limitLts' preferences={preferences} />
      <LimitCardQuantities typeUnit='limitUnits' preferences={preferences} />
      <LimitCardQuantities typeUnit='limitKgs' preferences={preferences} />
      <LimitCardQuantities typeUnit='limitGr' preferences={preferences} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { preferences } = await fetchPreferences()
  return { props: { preferences } }
}

export default PreferencesInventoryPage
