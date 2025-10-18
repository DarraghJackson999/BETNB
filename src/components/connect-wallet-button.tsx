'use client'

import { useMemo } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ExternalLink, Wallet, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useWalletContext } from '@/components/providers/wallet-provider'

export function ConnectWalletButton() {
  const { status, address, error, connect, disconnect } = useWalletContext()

  const statusCopy = useMemo(() => {
    if (status === 'connected' && address) {
      return `Connected · ${address.slice(0, 4)}…${address.slice(-4)}`
    }
    if (status === 'connecting') return 'Connecting…'
    if (status === 'unavailable') return 'Install Phantom'
    return 'Connect Wallet'
  }, [status, address])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size="lg"
          className="font-semibold"
          variant={status === 'connected' ? 'secondary' : 'default'}
        >
          {statusCopy}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[min(460px,90vw)] -translate-x-1/2 -translate-y-1/2',
            'rounded-3xl border border-[#2f2716] bg-[#12100b] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)]'
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <Dialog.Title className="text-2xl font-semibold text-[#f5f1e6]">
                Phantom wallet
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-[#9d9278]">
                Securely connect your Phantom browser extension to place live trades.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="rounded-full border border-[#2d2616] p-2 text-[#9d9278] transition hover:text-[#fbd24d]">
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>

          <button
            onClick={connect}
            className={cn(
              'mt-6 flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left',
              'transition focus-visible:outline-2 focus-visible:outline-[#f0c859]/70',
              status === 'connected'
                ? 'border-[#fbd24d]/70 bg-[#241d0d]'
                : 'border-[#2d2616] bg-[#19140c] hover:border-[#fbd24d]/40'
            )}
          >
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-[#2c2210] p-3 text-[#fbd24d]">
                <Wallet size={18} />
              </span>
              <div>
                <div className="font-semibold text-[#f5f1e6]">Phantom</div>
                <div className="text-xs text-[#9d9278]">
                  {status === 'connected' ? 'Wallet ready' : 'Browser extension'}
                </div>
              </div>
            </div>
            <span className="text-xs uppercase tracking-wide text-[#fbd24d]">
              {status === 'connected' ? 'Connected' : 'Connect'}
            </span>
          </button>

          <div className="mt-4 rounded-2xl border border-dashed border-[#3a311f] bg-[#1a150c] p-4 text-sm text-[#9d9278]">
            {status === 'connected'
              ? 'You are connected. Order tickets will open from market pages.'
              : 'Click connect to trigger the Phantom approval prompt in your browser.'}
          </div>

          {error && (
            <div className="mt-3 rounded-2xl border border-[#4c2a2a] bg-[#2a1616] p-3 text-xs text-[#f5c2c2]">
              {error}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between text-xs text-[#6f6550]">
            <button
              onClick={() =>
                window.open('https://phantom.app/download', '_blank', 'noopener')
              }
              className="inline-flex items-center gap-2 text-[#fbd24d] transition hover:text-[#ffe8a3]"
            >
              <ExternalLink size={14} /> Get Phantom extension
            </button>
            {status === 'connected' && (
              <button
                onClick={disconnect}
                className="text-[#fbd24d] transition hover:text-[#ffe8a3]"
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
