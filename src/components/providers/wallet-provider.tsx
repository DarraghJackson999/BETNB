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

export type WalletId = 'phantom' | 'metamask' | 'walletconnect'

type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'unavailable'

type WalletContextValue = {
  status: WalletStatus
  walletId: WalletId | null
  address: string | null
  error: string | null
  connect: (wallet: WalletId) => Promise<void>
  disconnect: () => Promise<void>
  detected: Record<WalletId, boolean>
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

function getMetaMaskProvider() {
  if (typeof window === 'undefined') return null
  const anyWindow = window as unknown as {
    ethereum?: {
      isMetaMask?: boolean
      providers?: unknown[]
      request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on?: (event: string, handler: (...args: unknown[]) => void) => void
      removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
    }
  }
  const ethereum = anyWindow.ethereum
  if (!ethereum) return null

  if (Array.isArray(ethereum.providers)) {
    const metamask = ethereum.providers.find(
      (provider: unknown) =>
        provider != null &&
        typeof provider === 'object' &&
        'isMetaMask' in provider &&
        (provider as { isMetaMask?: boolean }).isMetaMask
    ) as typeof ethereum | undefined
    if (metamask) {
      return metamask
    }
  }

  if (ethereum.isMetaMask) {
    return ethereum
  }

  return null
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<WalletStatus>('disconnected')
  const [walletId, setWalletId] = useState<WalletId | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [detected, setDetected] = useState<Record<WalletId, boolean>>({
    phantom: false,
    metamask: false,
    walletconnect: true,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateDetected = () => {
      const phantomProvider = getPhantomProvider()
      const metamaskProvider = getMetaMaskProvider()
      setDetected({
        phantom: Boolean(phantomProvider?.isPhantom),
        metamask: Boolean(metamaskProvider?.isMetaMask ?? metamaskProvider),
        walletconnect: true,
      })
    }

    updateDetected()

    window.addEventListener('ethereum#initialized', updateDetected as EventListener)
    const interval = window.setInterval(updateDetected, 3000)

    return () => {
      window.removeEventListener('ethereum#initialized', updateDetected as EventListener)
      window.clearInterval(interval)
    }
  }, [])

  const connect = useCallback(async (wallet: WalletId) => {
    setError(null)
    setWalletId(wallet)

    if (wallet === 'phantom') {
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
        setWalletId('phantom')
        return
      } catch (err) {
        setStatus('disconnected')
        const message = err instanceof Error ? err.message : 'Connection cancelled.'
        setError(message)
        setWalletId(null)
        return
      }
    }

    if (wallet === 'metamask') {
      const provider = getMetaMaskProvider()
      if (!provider) {
        setStatus('unavailable')
        setError('MetaMask not detected. Install the extension to continue.')
        if (typeof window !== 'undefined') {
          window.open('https://metamask.io/download/', '_blank', 'noopener')
        }
        return
      }

      try {
        setStatus('connecting')
        const accounts = (await provider.request?.({ method: 'eth_requestAccounts' })) as
          | string[]
          | undefined
        const account = accounts && accounts.length > 0 ? accounts[0] : null
        setAddress(account)
        setStatus(account ? 'connected' : 'disconnected')
        setWalletId(account ? 'metamask' : null)
        if (!account) {
          setError('No MetaMask account returned. Please approve the request and retry.')
        }
        return
      } catch (err) {
        setStatus('disconnected')
        const message = err instanceof Error ? err.message : 'Connection cancelled.'
        setError(message)
        setWalletId(null)
        return
      }
    }

    if (wallet === 'walletconnect') {
      setStatus('unavailable')
      setError(
        'WalletConnect support requires the dedicated mobile or desktop app. Please scan from a WalletConnect-ready wallet.'
      )
      if (typeof window !== 'undefined') {
        window.open('https://walletconnect.com/apps', '_blank', 'noopener')
      }
      return
    }
  }, [])

  const disconnect = useCallback(async () => {
    try {
      if (walletId === 'phantom') {
        const provider = getPhantomProvider()
        await provider?.disconnect()
      }
      if (walletId === 'metamask') {
        const provider = getMetaMaskProvider()
        provider?.removeListener?.('accountsChanged', () => {})
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to disconnect.'
      setError(message)
    }
    setStatus('disconnected')
    setAddress(null)
    setWalletId(null)
    setError(null)
  }, [walletId])

  useEffect(() => {
    const provider = getPhantomProvider()
    if (!provider) return

    function handleConnect(...args: unknown[]) {
      const publicKey = args[0] as { toString: () => string } | undefined
      setAddress(publicKey?.toString() ?? null)
      setStatus('connected')
      setError(null)
      setWalletId('phantom')
    }

    function handleDisconnect() {
      setStatus('disconnected')
      setAddress(null)
      setWalletId(null)
    }

    provider.on?.('connect', handleConnect)
    provider.on?.('disconnect', handleDisconnect)

    return () => {
      provider.off?.('connect', handleConnect)
      provider.off?.('disconnect', handleDisconnect)
    }
  }, [])

  useEffect(() => {
    const provider = getMetaMaskProvider()
    if (!provider) return

    const handleAccountsChanged = (accounts: unknown) => {
      if (!Array.isArray(accounts) || accounts.length === 0) {
        setStatus('disconnected')
        setAddress(null)
        setWalletId(null)
        return
      }
      setAddress(String(accounts[0]))
      setStatus('connected')
      setWalletId('metamask')
    }

    provider.on?.('accountsChanged', handleAccountsChanged)

    return () => {
      provider.removeListener?.('accountsChanged', handleAccountsChanged)
    }
  }, [])

  const value = useMemo(
    () => ({ status, walletId, address, error, connect, disconnect, detected }),
    [status, walletId, address, error, connect, disconnect, detected]
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
