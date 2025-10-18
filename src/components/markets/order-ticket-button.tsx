'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useWalletContext } from '@/components/providers/wallet-provider'

type OrderTicketButtonProps = {
  label: string
  className?: string
}

export function OrderTicketButton({ label, className }: OrderTicketButtonProps) {
  const { status, connect } = useWalletContext()
  const [notice, setNotice] = useState<string | null>(null)
  const [awaitingConnection, setAwaitingConnection] = useState(false)

  useEffect(() => {
    if (!awaitingConnection) return

    if (status === 'connected') {
      setNotice('Wallet connected. Order ticket coming next.')
      setAwaitingConnection(false)
    } else if (status === 'unavailable') {
      setNotice('Install Phantom to continue.')
      setAwaitingConnection(false)
    } else if (status === 'disconnected') {
      setNotice('Connection request closed.')
      setAwaitingConnection(false)
    }
  }, [awaitingConnection, status])

  async function handleClick() {
    if (status !== 'connected') {
      setAwaitingConnection(true)
      setNotice('Approve the Phantom prompt in your browser.')
      await connect()
      return
    }

    setNotice('Order ticket execution will be added in the next release.')
  }

  return (
    <div className="space-y-2">
      <Button
        variant="primary"
        className={className}
        onClick={handleClick}
        disabled={status === 'connecting'}
      >
        {status === 'connecting' ? 'Connecting…' : label}
      </Button>
      {notice && <p className="text-xs text-[#9d9278]">{notice}</p>}
    </div>
  )
}
