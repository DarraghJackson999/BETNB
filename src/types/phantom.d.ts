export interface PhantomConnectResponse {
  publicKey?: {
    toString: () => string
  }
}

export interface PhantomProvider {
  isPhantom?: boolean
  connect: (options?: { onlyIfTrusted?: boolean }) => Promise<PhantomConnectResponse>
  disconnect: () => Promise<void>
  on?: (event: 'connect' | 'disconnect', handler: (...args: unknown[]) => void) => void
  off?: (event: 'connect' | 'disconnect', handler: (...args: unknown[]) => void) => void
}

declare global {
  interface Window {
    solana?: PhantomProvider
    phantom?: { solana?: PhantomProvider }
  }
}

export {}
