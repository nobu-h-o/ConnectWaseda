'use client'

import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from './api/auth/auth-provider'
import SyncUser from './syncuser'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <SyncUser />
        {children}
      </AuthProvider>
    </SessionProvider>
  )
} 