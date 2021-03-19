import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react'
import { whoAmI } from 'services/users'
import { UserT } from 'types'

interface IUseUser {
  isLoading: boolean
  setState: any
  user: UserT
  users: UserT[]
}

const UserContext = createContext({} as IUseUser)

type Props = {
  children: ReactNode
}

export function UserProvider ({ children }: Props): React.ReactElement {
  const [{ isLoading, user, users }, setState] = useReducer(Reducer, {
    isLoading: true,
    user: null,
    users: []
  })

  function Reducer (prevState: any, state: any) {
    return { ...prevState, ...state }
  }

  const whoami = useCallback(async (): Promise<void> => {
    try {
      const { user } = await whoAmI()
      setState({ user, isLoading: false })
    } catch ({ message }) {
      console.error(message)
      setState({ isLoading: false })
    }
  }, [])

  useEffect((): void => {
    whoami()
  }, [whoami])

  const value = useMemo(() => {
    return {
      isLoading,
      setState,
      user,
      users
    }
  }, [isLoading, user, users])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser (): IUseUser {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser debe estar dentro del Proveedor')
  }
  return context
}
