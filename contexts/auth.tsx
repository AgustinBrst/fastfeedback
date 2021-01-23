import * as React from 'react'
import { Auth } from '../lib/auth'
import { User } from '../types/user'

type ContextValue = {
  user: User | null
  isLoading: boolean
  signInWithGithub: () => void
  signOut: () => void
}

const AuthContext = React.createContext<ContextValue | null>(null)
AuthContext.displayName = 'AuthContext'

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  async function signInWithGithub() {
    setIsLoading(true)
    const user = await Auth.signInWithGithub()
    setUser(user)
    setIsLoading(false)
  }

  async function signOut() {
    setIsLoading(true)
    await Auth.signOut()
    setUser(null)
    setIsLoading(false)
  }

  React.useEffect(() => {
    const unsubscribe = Auth.onAuthStateChange((user) => setUser(user))
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithGithub,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider component')
  }
  return context
}
