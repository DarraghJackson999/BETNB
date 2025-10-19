'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useWalletContext } from '@/components/providers/wallet-provider'
import { cn } from '@/lib/utils'

type OrderTicketButtonProps = {
  label: string
  className?: string
  tone?: 'buy' | 'sell'
}

export function OrderTicketButton({
  label,
  className,
  tone = 'buy',
}: OrderTicketButtonProps) {
  const { status, walletId, connect } = useWalletContext()
  const [notice, setNotice] = useState<string | null>(null)
  const [awaitingConnection, setAwaitingConnection] = useState(false)

  useEffect(() => {
    if (!awaitingConnection) return

    if (status === 'connected') {
      setNotice('Wallet connected. Order ticket coming next.')
      setAwaitingConnection(false)
    } else if (status === 'unavailable') {
      setNotice('Selected wallet unavailable in this browser.')
      setAwaitingConnection(false)
    } else if (status === 'disconnected') {
      setNotice('Connection request closed.')
      setAwaitingConnection(false)
    }
  }, [awaitingConnection, status])

  async function handleClick() {
    if (status !== 'connected') {
      if (!walletId) {
        setNotice('Select a wallet from the connect button first.')
        return
      }
      setAwaitingConnection(true)
      setNotice(
        `Approve the ${walletId === 'metamask' ? 'MetaMask' : walletId === 'phantom' ? 'Phantom' : 'WalletConnect'} prompt in your wallet.`
      )
      await connect(walletId)
      return
    }

    setNotice('Order ticket execution will be added in the next release.')
  }

  const toneClasses =
    tone === 'sell'
      ? 'bg-gradient-to-r from-[#ff6f91] via-[#ff9db3] to-[#ffd6e5] text-[#2b0f1b] shadow-[0_26px_80px_rgba(255,118,154,0.35)] ring-2 ring-[rgba(255,170,200,0.5)] hover:from-[#ff7da0] hover:to-[#ffe4ef]'
      : 'bg-gradient-to-r from-[#7f5bff] via-[#a377ff] to-[#f6ecff] text-[#120d2d] shadow-[0_28px_84px_rgba(127,91,255,0.45)] ring-2 ring-[rgba(190,168,255,0.55)] hover:from-[#8d69ff] hover:to-[#fdf8ff]'

  return (
    <div className="space-y-2">
      <Button
        variant="primary"
        className={cn(
          'w-full px-6 text-sm font-semibold uppercase tracking-wide transition-all duration-200',
          toneClasses,
          className
        )}
        onClick={handleClick}
        disabled={status === 'connecting'}
      >
        {status === 'connecting' ? 'Connecting…' : label}
      </Button>
      {notice && <p className="text-xs text-[#cbbdff]">{notice}</p>}
    </div>
  )
}
