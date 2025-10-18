'use client'

import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'betnb-site-password'
const ACCESS_PASSWORD = (process.env.NEXT_PUBLIC_SITE_PASSWORD ?? 'betnb').trim()

interface PasswordGateProps {
  children: ReactNode
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')
  const normalizedPassword = useMemo(() => ACCESS_PASSWORD, [])

  useEffect(() => {
    if (!normalizedPassword) {
      setUnlocked(true)
      return
    }

    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && stored === normalizedPassword) {
      setUnlocked(true)
    }
  }, [normalizedPassword])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!normalizedPassword) {
      setUnlocked(true)
      return
    }

    if (input.trim() === normalizedPassword) {
      window.localStorage.setItem(STORAGE_KEY, normalizedPassword)
      setUnlocked(true)
      setError('')
      return
    }

    setError('Incorrect password')
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-black/70 p-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-lg font-semibold tracking-wide">Restricted Access</h1>
          <p className="text-sm text-white/60">
            Enter the access password to view BETNB.
          </p>
        </div>
        <div className="space-y-2">
          <label
            className="block text-xs uppercase tracking-wide text-white/60"
            htmlFor="password"
          >
            Access password
          </label>
          <input
            id="password"
            type="password"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-3 text-sm outline-none focus:border-white"
            autoFocus
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg border border-white/30 bg-white/10 py-3 text-sm font-medium transition hover:bg-white/20"
        >
          Unlock
        </button>
        <p className="text-center text-[11px] text-white/40">
          Tip: set NEXT_PUBLIC_SITE_PASSWORD to empty to disable the gate.
        </p>
      </form>
    </div>
  )
}
