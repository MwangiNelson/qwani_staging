'use client'
import { signOut } from '@/app/action/auth.action'
import { useGetUser } from '@/hooks/api/use_users'
import { IUser } from '@/types/table.types'
import { createClient } from '@/utils/supabase/supabase_ client'
import { User } from '@supabase/supabase-js'
import React, { Dispatch, useEffect } from 'react'

export interface IAuthContext {
  auth_user: User | null
  setAuthUser: Dispatch<User | null>
  user: IUser | undefined
  loading: boolean
  logout: () => Promise<void>
  fetchUser: () => void
  clearState: () => void
  loggedIn: {} | null | { user_id: string }
}

const AuthContext = React.createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth_user, setAuthUser] = React.useState<User | null>(null)
  const { data: user, isPending, refetch } = useGetUser(auth_user?.id)
  const [loggedIn, setLoggedIn] = React.useState<
    | {}
    | null
    | {
        user_id: string
      }
  >({})

  const supabase = createClient()
  const clearState = () => {
    setAuthUser(null)
  }
  const logout = async () => {
    await signOut()
    await supabase.auth.signOut()
    setLoggedIn(null)
    window.location.reload()
  }

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()
        user?.id
          ? setLoggedIn({
              user_id: user?.id,
            })
          : setLoggedIn(null)
        setAuthUser(user)
        if (authError) {
          setAuthUser(null)
        }
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            setAuthUser(session?.user ?? null)
            setLoggedIn({
              user_id: user?.id,
            })
          } else {
            setAuthUser(null)
          }
        })
        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setAuthUser(null)
      } finally {
      }
    }

    initializeAuth()
  }, [supabase.auth])

  useEffect(() => {
    if ((!auth_user || !user) && !isPending) {
      setLoggedIn(null)
    }
  }, [auth_user])

  return (
    <AuthContext.Provider
      value={{
        auth_user,
        setAuthUser,
        user,
        loading: isPending,
        logout,
        fetchUser: refetch,
        clearState,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return context
}
