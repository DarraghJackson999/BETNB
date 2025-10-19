'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type WalletDialogContextValue = {
  open: boolean
  setDialogOpen: (open: boolean) => void
  openDialog: () => void
  closeDialog: () => void
  toggleDialog: () => void
}

const WalletDialogContext = createContext<WalletDialogContextValue | undefined>(undefined)

export function WalletDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const setDialogOpen = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)
    },
    [setOpen]
  )

  const openDialog = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const closeDialog = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const toggleDialog = useCallback(() => {
    setOpen((prev) => !prev)
  }, [setOpen])

  const value = useMemo(
    () => ({ open, setDialogOpen, openDialog, closeDialog, toggleDialog }),
    [open, setDialogOpen, openDialog, closeDialog, toggleDialog]
  )

  return (
    <WalletDialogContext.Provider value={value}>{children}</WalletDialogContext.Provider>
  )
}

export function useWalletDialog() {
  const context = useContext(WalletDialogContext)
  if (!context) {
    throw new Error('useWalletDialog must be used within a WalletDialogProvider')
  }
  return context
}
