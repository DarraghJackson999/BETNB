'use client'

import { type ReactNode, useMemo } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ExternalLink, Ghost, QrCode, Shield, Sparkles, Wallet, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useWalletContext } from '@/components/providers/wallet-provider'
import type { WalletId } from '@/components/providers/wallet-provider'
import { useWalletDialog } from '@/components/providers/wallet-dialog-provider'

type ConnectorId = WalletId | 'coinbase' | 'rabby'

type ConnectorConfig = {
  id: ConnectorId
  label: string
  badge: string
  description: string
  installUrl?: string
  present: boolean
  comingSoon?: boolean
  supported: boolean
  icon: ReactNode
  accentClass: string
}

const WALLET_LABELS: Record<WalletId, string> = {
  phantom: 'Phantom',
  metamask: 'MetaMask',
  walletconnect: 'WalletConnect',
}

export function ConnectWalletButton() {
  const { status, walletId, address, error, connect, disconnect, detected } =
    useWalletContext()
  const { open, setDialogOpen } = useWalletDialog()

  const shortAddress = useMemo(() => {
    if (!address) return null
    if (address.length <= 10) return address
    return `${address.slice(0, 4)}…${address.slice(-4)}`
  }, [address])

  const statusCopy = useMemo(() => {
    const label = walletId ? WALLET_LABELS[walletId] : 'Wallet'
    if (status === 'connected') {
      return shortAddress ? `${label} · ${shortAddress}` : `${label} connected`
    }
    if (status === 'connecting') {
      return `Connecting ${label}…`
    }
    if (status === 'unavailable' && walletId) {
      return `Install ${label}`
    }
    return 'Connect Wallet'
  }, [status, walletId, shortAddress])

  const connectors = useMemo<ConnectorConfig[]>(
    () => [
      {
        id: 'metamask',
        label: 'MetaMask',
        badge: 'EVM',
        description: detected.metamask
          ? 'MetaMask extension detected in this browser.'
          : 'Install MetaMask to connect an EVM desk wallet.',
        installUrl: 'https://metamask.io/download/',
        present: detected.metamask,
        supported: true,
        icon: <Shield size={18} />,
        accentClass: 'bg-[rgba(255,146,92,0.18)] text-[#ffb489]',
      },
      {
        id: 'phantom',
        label: 'Phantom',
        badge: 'Solana',
        description: detected.phantom
          ? 'Phantom extension ready for Solana + EVM routing.'
          : 'Install Phantom to bridge Solana and EVM order flow.',
        installUrl: 'https://phantom.app/download',
        present: detected.phantom,
        supported: true,
        icon: <Ghost size={18} />,
        accentClass: 'bg-[rgba(127,91,255,0.2)] text-[#d7c6ff]',
      },
      {
        id: 'walletconnect',
        label: 'WalletConnect',
        badge: 'Mobile',
        description: 'Scan with a WalletConnect ready mobile wallet (coming soon).',
        installUrl: 'https://walletconnect.com/apps',
        present: true,
        supported: false,
        comingSoon: true,
        icon: <QrCode size={18} />,
        accentClass: 'bg-[rgba(91,169,255,0.18)] text-[#9ad8ff]',
      },
      {
        id: 'coinbase',
        label: 'Coinbase Wallet',
        badge: 'EVM',
        description: 'Prefer Coinbase Wallet? Coinbase Wallet support lands next.',
        installUrl: 'https://www.coinbase.com/wallet',
        present: false,
        supported: false,
        comingSoon: true,
        icon: <Wallet size={18} />,
        accentClass: 'bg-[rgba(62,118,255,0.2)] text-[#b7ccff]',
      },
      {
        id: 'rabby',
        label: 'Rabby',
        badge: 'Desktop',
        description:
          'Rabby desktop extension integration is on the implementation roadmap.',
        installUrl: 'https://rabby.io',
        present: false,
        supported: false,
        comingSoon: true,
        icon: <Sparkles size={18} />,
        accentClass: 'bg-[rgba(255,143,171,0.2)] text-[#ffd6e5]',
      },
    ],
    [detected]
  )

  const isSupportedWallet = (id: ConnectorId): id is WalletId =>
    id === 'metamask' || id === 'phantom' || id === 'walletconnect'

  const handleConnectorSelect = (connector: ConnectorConfig) => {
    if (!connector.supported) {
      if (connector.installUrl && typeof window !== 'undefined') {
        window.open(connector.installUrl, '_blank', 'noopener')
      }
      return
    }

    if (!isSupportedWallet(connector.id)) return

    if (!connector.present) {
      if (connector.installUrl && typeof window !== 'undefined') {
        window.open(connector.installUrl, '_blank', 'noopener')
      }
      return
    }

    void connect(connector.id)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setDialogOpen}>
      <Dialog.Trigger asChild>
        <Button
          size="lg"
          variant={status === 'connected' ? 'secondary' : 'primary'}
          className={cn(
            'relative whitespace-nowrap px-8 text-base font-semibold transition-all duration-200 focus-visible:outline-[#c9b5ff] drop-shadow-[0_0_18px_rgba(122,88,210,0.32)]',
            status === 'connected'
              ? 'border border-[rgba(170,140,255,0.45)] bg-[rgba(127,91,255,0.28)] text-white shadow-[0_22px_64px_rgba(92,64,174,0.38)] hover:bg-[rgba(127,91,255,0.34)]'
              : 'shadow-[0_26px_84px_rgba(127,91,255,0.45)] hover:shadow-[0_32px_96px_rgba(150,118,255,0.5)]',
            status === 'connecting' && 'animate-pulse'
          )}
        >
          {statusCopy}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[min(520px,92vw)] -translate-x-1/2 -translate-y-1/2 space-y-6',
            'rounded-3xl border border-[rgba(127,91,255,0.36)] bg-[rgba(12,8,32,0.96)] p-8 shadow-[0_48px_140px_rgba(45,26,120,0.5)] backdrop-blur'
          )}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <Dialog.Title className="text-2xl font-semibold text-white">
                Connect a wallet
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-[#b9a8ef]">
                Link an execution wallet to submit private orders and settle fills.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="rounded-full border border-[rgba(127,91,255,0.36)] p-2 text-[#d7c6ff] transition hover:text-white">
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-3">
            {connectors.map((connector) => {
              const isActive = walletId === connector.id
              const isConnected = isActive && status === 'connected'
              const isConnecting = isActive && status === 'connecting'
              const isUnavailable = isActive && status === 'unavailable'
              const isRoadmapOnly = connector.comingSoon && !connector.supported
              const actionLabel = isRoadmapOnly
                ? 'Roadmap'
                : connector.comingSoon
                  ? 'Soon'
                  : isConnected
                    ? 'Connected'
                    : isConnecting
                      ? 'Connecting…'
                      : connector.present
                        ? 'Ready'
                        : 'Install'
              const isUnavailableState =
                isUnavailable || (!connector.present && connector.supported)
              const disabled = isRoadmapOnly || (connector.supported && isConnecting)

              return (
                <button
                  key={connector.id}
                  type="button"
                  onClick={() => handleConnectorSelect(connector)}
                  disabled={disabled}
                  className={cn(
                    'flex items-center justify-between gap-5 rounded-3xl border px-5 py-5 text-left transition focus-visible:outline-2 focus-visible:outline-[#b8a3ff]/70',
                    isConnected
                      ? 'border-[rgba(190,163,255,0.65)] bg-[rgba(127,91,255,0.18)] shadow-[0_26px_90px_rgba(86,58,164,0.38)]'
                      : isActive
                        ? 'border-[rgba(127,91,255,0.45)] bg-[rgba(18,12,45,0.92)] shadow-[0_24px_80px_rgba(86,58,164,0.3)]'
                        : 'border-[rgba(127,91,255,0.22)] bg-[rgba(15,10,36,0.82)] hover:border-[rgba(127,91,255,0.38)] hover:bg-[rgba(21,14,52,0.88)]',
                    isRoadmapOnly && 'cursor-not-allowed opacity-70',
                    connector.supported &&
                      !connector.present &&
                      'border-dashed border-[rgba(255,157,179,0.6)]',
                    connector.supported &&
                      !connector.present &&
                      'hover:border-[rgba(255,157,179,0.8)]',
                    disabled && 'cursor-not-allowed'
                  )}
                >
                  <div className="grid flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                    <span
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-2xl border border-transparent',
                        connector.accentClass,
                        isConnected &&
                          'ring-2 ring-offset-2 ring-offset-[rgba(12,8,32,0.96)] ring-[#cbbdff]'
                      )}
                    >
                      {connector.icon}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-white">
                          {connector.label}
                        </span>
                        <span className="rounded-full border border-[rgba(127,91,255,0.35)] px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-[#a89dd4]">
                          {connector.badge}
                        </span>
                      </div>
                      <div className="text-xs text-[#a89dd4]">
                        {connector.description}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#6f5fb8]">
                        {connector.present
                          ? 'Detected'
                          : connector.supported
                            ? 'Install required'
                            : 'Roadmap'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={cn(
                        'text-xs uppercase tracking-[0.3em]',
                        isRoadmapOnly
                          ? 'text-[#8fc4ff]'
                          : isConnected
                            ? 'text-[#d7c6ff]'
                            : isUnavailableState
                              ? 'text-[#ff9db3]'
                              : 'text-[#cbbdff]'
                      )}
                    >
                      {actionLabel}
                    </div>
                    {connector.supported && connector.present && !isConnected && (
                      <div className="mt-3">
                        <Button
                          size="sm"
                          variant="primary"
                          className="rounded-full px-5 text-xs font-semibold uppercase tracking-[0.3em]"
                        >
                          Connect
                        </Button>
                      </div>
                    )}
                    {isConnected && shortAddress && (
                      <div className="mt-1 font-mono text-xs text-[#cbbdff]">
                        {shortAddress}
                      </div>
                    )}
                    {connector.supported &&
                      !connector.present &&
                      connector.installUrl && (
                        <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#ff9db3]">
                          Install first
                        </div>
                      )}
                  </div>
                </button>
              )
            })}
          </div>

          {error && (
            <div className="rounded-2xl border border-[rgba(255,121,146,0.45)] bg-[rgba(53,21,40,0.82)] p-3 text-xs text-[#ffd6e5]">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-[#a89dd4]">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://ethereum.org/en/wallets/', '_blank', 'noopener')
                }
              }}
              className="inline-flex items-center gap-2 text-[#d7c6ff] transition hover:text-white"
            >
              <ExternalLink size={14} /> Wallet primer
            </button>
            {status === 'connected' && (
              <button
                type="button"
                onClick={disconnect}
                className="text-[#ff9db3] transition hover:text-[#ffd6e5]"
              >
                Disconnect
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
