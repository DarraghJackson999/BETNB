'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { PhantomProvider } from '@/types/phantom'

type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'unavailable'

type WalletContextValue = {
  status: WalletStatus
  address: string | null
  error: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined)

function getPhantomProvider() {
  if (typeof window === 'undefined') return null
  const anyWindow = window as unknown as {
    solana?: PhantomProvider
    phantom?: { solana?: PhantomProvider }
  }
  return anyWindow.solana ?? anyWindow.phantom?.solana ?? null
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<WalletStatus>('disconnected')
  const [address, setAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const connect = useCallback(async () => {
    setError(null)
    const provider = getPhantomProvider()

    if (!provider || !provider.isPhantom) {
      setStatus('unavailable')
      setError('Phantom wallet not detected. Install the extension to continue.')
      if (typeof window !== 'undefined') {
        window.open('https://phantom.app/download', '_blank', 'noopener')
      }
      return
    }

    try {
      setStatus('connecting')
      const response = await provider.connect()
      const publicKey = response?.publicKey?.toString() ?? null
      setAddress(publicKey)
      setStatus('connected')
    } catch (err) {
      setStatus('disconnected')
      const message = err instanceof Error ? err.message : 'Connection cancelled.'
      setError(message)
    }
  }, [])

  const disconnect = useCallback(async () => {
    const provider = getPhantomProvider()
    try {
      await provider?.disconnect()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to disconnect.'
      setError(message)
    }
    setStatus('disconnected')
    setAddress(null)
  }, [])

  useEffect(() => {
    const provider = getPhantomProvider()
    if (!provider) return

    function handleConnect(...args: unknown[]) {
      const publicKey = args[0] as { toString: () => string } | undefined
      setAddress(publicKey?.toString() ?? null)
      setStatus('connected')
      setError(null)
    }

    function handleDisconnect() {
      setStatus('disconnected')
      setAddress(null)
    }

    provider.on?.('connect', handleConnect)
    provider.on?.('disconnect', handleDisconnect)

    return () => {
      provider.off?.('connect', handleConnect)
      provider.off?.('disconnect', handleDisconnect)
    }
  }, [])

  const value = useMemo(
    () => ({ status, address, error, connect, disconnect }),
    [status, address, error, connect, disconnect]
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWalletContext() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider')
  }
  return context
}
